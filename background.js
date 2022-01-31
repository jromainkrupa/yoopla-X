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


const storeProfileInYoopla = (request) => {
  chrome.storage.local.get(null, request => {
    if (request.logged_in) {
      fetch("http://localhost:3000/api/v1/hunter/candidates", {
        method: "POST",
        headers: {
          'X-User-Token': request.user_token,
          'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          first_name: request.first_name, 
          current_job_title: request.current_job_title,
          linkedin_url: request.linkedin_url})
      })
      .then(response => console.log(response.json()))
    }
  })
}

// listening to messages
const messageFunctionMapper = { 
  fetch: storeProfileInYoopla
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  
  if (request.message in messageFunctionMapper) {
    messageFunctionMapper[request.message](request)
  }
});
  