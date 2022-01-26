// Check if user is connected to yoopla by checking cookies
const handleSessionCookies = () => {
  chrome.cookies.get({url:'http://localhost:3000/', name:'signed_in'}, function(cookie, tab) {
    console.log('in cookies');
    if (cookie) {
      chrome.storage.local.set({ user_token: cookie.value });
    } 
  })
}
const isLinkedinProfileRegex = /https:\/\/www.linkedin.com\/in/

// every time a user goes on a linkedin profile foreground.js script is launched
// if the user is not on linkedin, popup not on linkedin appears
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
  console.log('click');
  handleSessionCookies()
  chrome.storage.local.get(null, request => {
    if (request.user_token) {
      chrome.action.setPopup({
        popup: 'popup.html'
      })
    } else {
      chrome.action.setPopup({popup: 'popup_unconnected.html'})
    }
  })
})

const storeProfileInYoopla = () => {
    // choppe le cookie
    // fetch depuis le background plutot que popup.js
}

// listening to messages
const messageFunctionMapper = { 
  toto: storeProfileInYoopla
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request !== undefined) {
    console.log(request);
  } else if (request.message in messsageFunctionMapper) {
    messageFunctionMapper[request.message]()

  }
});
  