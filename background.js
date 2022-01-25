  chrome.cookies.get({url:'http://localhost:3000/', name:'signed_in'}, function(cookie, tab) {
    if (cookie) {
      console.log('I am signed in on yoopla');
    } else {
        console.log('not signed in on yoopla');
        // set the popup to prompt user to connect to yoopla
    }
  })


// chrome.action.onClicked.addListener((tab) => {
//   console.log(tab);
  
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


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   // communication tree
//   // if (request === 'get_name') {
//   //   return "Jack";
//   // }

//   console.log(request, sender, sendResponse);
  
// });