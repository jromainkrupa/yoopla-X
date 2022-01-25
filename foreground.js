// parsing linkedin DOM
el = document.querySelector('h1')
ce_name = el.innerText
ce_job_title = el.parentNode.nextElementSibling.innerText

// building json 
user = {name: ce_name, current_job_title: ce_job_title}

// saving json into local storage
chrome.storage.local.set(user)

// send message to backgorund.js
chrome.runtime.sendMessage(user)

