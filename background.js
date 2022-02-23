// every time a user goes on a linkedin profile foreground.js script is launched
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    if (tab.url.match(/https:\/\/www.linkedin.com\/in/) ) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"],
      })
    }
  }
})

const storeProfileInYoopla = (requestFromMessage) => {
  console.log(requestFromMessage)
  chrome.storage.local.get(null, request => {
    console.log(requestFromMessage)
    fetch("https://www.yoopla-ats.com/api/v1/candidates", {
      method: "POST",
      headers: {
        'X-User-Token': request.user_token,
        'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: requestFromMessage.user_id,
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
      console.log(data)
      console.log('message' in data)
      if ('errors' in data) {
        chrome.runtime.sendMessage({
          msg: "errors_in_fetch",
          content: {
              subject: "errors",
              errors: data['errors']
          }
        });
      } else if ('message' in data) {
        console.log('hee')
        chrome.runtime.sendMessage({
          msg: "successful_fetch",
          content: {
              subject: "success",
              content: data['message']
          }
        });
      }
    })

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
