// parsing linkedin DOM
el = document.querySelector('h1')
ce_name = el.innerText
ce_job_title = el.parentNode.nextElementSibling.innerText
ce_linkedin_url = window.location.href

// building json 
user = {name: ce_name, 
        current_job_title: ce_job_title,
        linkedin_url: ce_linkedin_url}

// saving json into local storage
chrome.storage.local.set(user)

// send message to backgorund.js
chrome.runtime.sendMessage(user)

