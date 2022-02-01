const isLinkedinProfileRegex = /https:\/\/www.linkedin.com\/in/

// every time a user goes on a linkedin profile foreground.js script is launched
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    if (tab.url.match(isLinkedinProfileRegex) ) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"],
      })
    } 
  }
})
// function CheckError(response) {
//   if (response.status >= 200 && response.status <= 299) {
//     return response.json();
//   } else {
//     throw Error(response.statusText);
//   }
// }

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
          last_name: request.last_name, 
          current_job_title: request.current_job_title,
          linkedin_url: request.linkedin_url,
          avatar_url: request.profile_url,
          current_company_name: request.current_company
        })
      })
      .then((response) => response.json())
      .then((data) => {
        if ('errors' in data) {
          chrome.runtime.sendMessage({
            msg: "errors_in_fetch", 
            data: {
                subject: "errors",
                content: data
            }
          });

            
        } else if ('id' in data) {
          chrome.runtime.sendMessage({
            msg: "successful_fetch", 
            data: {
                subject: "success",
                content: data
            }
          });
        }
      })
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