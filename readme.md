# Yoopla X

A simple Chrome extension, to help independant recruiters to import candidates from Linkedin directly into their Yoopla's ATS.

## Pseudo Code

1. Check if user's is connected on yoopla (service worker: check session cookies)
````
chrome.cookies.get({url:'http://localhost:3000/', name:'signed_in'}, function(cookie, tab) {
 // stuff
  })
````
2. if user is connected wait for click on chrome extension else prompt to sign in on yoopla
````
chrome.action.onClicked.addListener((tab) => {})
````
3. if user is on  a linkedin profile (match url) else prompt go on a linkedin onto the Chrome extension's popup
4. Wait for DOM to load (foreground.js) 
````
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {})
````
5. Parse and store linkedin profile infos into variable foreground send message to popup
6. Display profile infos on Chrome extension popup to the user
7. if user click import button 
8. POST Candidate#create to yoopla api
9. if errors display errors on popup page else prompt success.