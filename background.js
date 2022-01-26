// Check if user is connected to yoopla by checking cookies
// const handleSessionCookies = () => {
//   chrome.cookies.get({url:'http://localhost:3000/', name:'signed_in'}, function(cookie, tab) {
//     console.log('in cookies');
//     if (cookie) {
//       chrome.storage.local.set({ user_token: cookie.value });
//     } 
//   })
// }
const isLinkedinProfileRegex = /https:\/\/www.linkedin.com\/in/

// every time a user goes on a linkedin profile foreground.js script is launched
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    if (tab.url.match(isLinkedinProfileRegex) ) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"]
      })
    } 
  }
})

// launching popup.html when user clicks on extension badge
chrome.action.onClicked.addListener((tab) => {
  chrome.action.setPopup({
    popup: 'popup.html'
  })
})

const storeProfileInYoopla = (request) => {
  chrome.cookies.get({url:'http://localhost:3000/', name:'signed_in'}, function(cookie, tab) {
    console.log('in cookies');
    console.log(cookie.name);
    
    if (cookie) {
      fetch("http://localhost:3000/api/v1/hunter/candidates", {
        method: "POST",
        headers: {
          'X-User-Token': cookie.value,
          'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          first_name: request.first_name, 
          current_job_title: request.current_job_title,
          linkedin_url: request.linkedin_url})
      })
    } else {
      chrome.action.setPopup({
        popup: 'popup_unconnected.html'
      })
    }
  })
}

// listening to messages
const messageFunctionMapper = { 
  fetch: storeProfileInYoopla
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender, sendResponse );
  
  if (request.message in messageFunctionMapper) {
    messageFunctionMapper[request.message](request)
  }
});
  