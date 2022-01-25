// Check if user is connected to yoopla by checking cookies
chrome.cookies.get({url:'http://localhost:3000/', name:'signed_in'}, function(cookie, tab) {
  if (cookie) {
    console.log('I am signed in on yoopla');
  } else {
    chrome.action.setPopup({popup: 'popup_unconnected.html'})
  }
})

// every time a user goes on a linkedin profile foreground.js script is launched
// if the user is not on linkedin, popup not on linkedin appears
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    if (tab.url.match(/https:\/\/www.linkedin.com\/in/) ) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"]
      })
    } else {
      chrome.action.setPopup({popup: 'popup_not_linkedin.html'})
    }
  }
})

// launching popup.html when user clicks on extension badge
chrome.action.onClicked.addListener((tab) => {
  chrome.action.setPopup({
    popup: 'popup.html'
  })
})

// listening to messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request !== undefined) {
    console.log(request);
  } 
});
  