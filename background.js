chrome.cookies.get({url:'http://localhost:3000/', name:'signed_in'}, function(cookie, tab) {
  if (cookie) {
    console.log('I am signed in on yoopla');
  } else {
      console.log('not signed in on yoopla');
      // set the popup to prompt user to connect to yoopla
  }
})


// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    
//     if (tab.url.match(/https:\/\/www.linkedin.com\/in/) ) {
//       chrome.scripting.executeScript({
//         target: { tabId: tabId },
//         files: ["./foreground.js"]
//       })
//     }
//   }
// })

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.match(/https:\/\/www.linkedin.com\/in/) ) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["./foreground.js"]
    })
  } else {
    console.log('you should go on linkedin');
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    profileInfos = request
    console.log(profileInfos);
    return true
  } 
});
  
//   // check if we are connected to yoopla by looking for a connection cookie

//   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
//       chrome.scripting.insertCSS({
//         target: { tabId: tabId },
//         files: ["./foreground_styles.css"]
//       })
//       .then(() => {
//         console.log("INJECTED THE FOREGROUND STYLES.");
        
//         chrome.scripting.executeScript({
//           target: { tabId: tabId },
//           files: ["./foreground.js"]
//         })
//         .then(() => {
//                       chrome.action.setPopup({popup: 'popup.html'})
//                         console.log("INJECTED THE FOREGROUND SCRIPT.");
//                     });
//             })
//             .catch(err => console.log(err));
//     }
//   });
// })
