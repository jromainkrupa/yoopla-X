function parsingDom() {
        // parsing linkedin DOM
        el = document.querySelector('h1')
        ce_name = el.innerText.split(/\s/,2)
        ce_job_title = el.parentNode.nextElementSibling.innerText
        ce_linkedin_url = window.location.href
        ce_profile_url = document.querySelector(`img[alt='${el.innerText}']`).src
        ce_current_company_html = document.querySelector('[aria-label="Current company"]')
        console.log(ce_current_company_html);
        
        if (ce_current_company_html != null) {
                ce_current_company = ce_current_company_html.innerText
        } else {
                ce_current_company = ''
        }




        // building json 
        user = 
        {
                first_name: ce_name[0], 
                last_name: ce_name[1], 
                current_job_title: ce_job_title,
                linkedin_url: ce_linkedin_url,   
                profile_url: ce_profile_url,
                current_company: ce_current_company    
        }
        console.log(user);
        
        // saving json into local storage
        chrome.storage.local.set(user)

        // send message to background.js
        chrome.runtime.sendMessage(user)
        
}

setTimeout(parsingDom, 500)
