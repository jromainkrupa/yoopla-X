const notConnectedToYooplaHTML = `
<div class="flex flex-col items-center justify-center p-8">
  <img id="logo" src="images/logo_purple_full.png" alt="logo yoopla">
  <p class="mt-4 text-gray-800">Get paid to refer great candidates to amazing jobs.</p>
  <a class="btn mt-4" target="_blank" href="https://app.yoopla.io/users/sign_in">Sign in Yoopla</a>
  <p class="mt-8 text-center">Sign up on Yoopla and start to add candidates from Linkedin in one click.</p>
</div>`

const notOnLinkedinHTML = `
<div class="flex flex-col items-center justify-center p-8">
  <img id="logo" src="images/logo_purple_full.png" alt="logo yoopla">
  <p class="mt-4 text-gray-800">YooplaX is now active.</p>
  <p class="mt-4 text-gray-800">Just go on a Linkedin profile and add a candidate on Yoopla.</p>
</div>`

const successHTML = `      
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
</svg>
<p class="text-gray-800 ml-2">Candidate imported</p>`


const isLinkedinProfileRegex = /https:\/\/www.linkedin.com\/in/

// retrieving infos from local storage to insert into popup
chrome.cookies.get({url:'http://localhost:3000/', name:'signed_in'}, function(cookie, tab) {
  // if yoopla's cookie signed_in present
  if (cookie) {
    query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
      let currentTab = tabs[0];

      // if the current tab is a linkedin candidate
      if (currentTab.url.match(isLinkedinProfileRegex)) {
        chrome.storage.local.get(null, request => {
          document.getElementById("name").innerHTML = `${request.first_name} ${request.last_name}`;
          document.getElementById("jobTitle").innerHTML = request.current_job_title;
          document.getElementById("input-job-title").value = request.current_job_title
          document.getElementById("input-linkedin-url").value = request.linkedin_url
          document.getElementById("input-company").value = request.current_company
          document.getElementById("profile-picture").src = request.profile_url        
          button = document.getElementById("sendButton")
          if (button) {
            
            button.addEventListener('click', (event) => {
              event.preventDefault()
              chrome.runtime.sendMessage({
                message: 'fetch',
                first_name: request.first_name, 
                last_name: request.last_name, 
                current_job_title: request.current_job_title,
                linkedin_url: request.linkedin_url
              })
            })
          }
        });
        
      } else {
        document.querySelector('body').innerHTML = notOnLinkedinHTML
      }
    });
  } else {
    document.querySelector('body').innerHTML = notConnectedToYooplaHTML
  }
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "errors_in_fetch") {
        console.log(request.content.errors.first);
        
        document.getElementById('fetch-result').innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p class="text-gray-800 ml-2">${request.content.errors[0]}</p>`
        successHTML
      } else if (request.msg === "successful_fetch") {
        document.getElementById('fetch-result').innerHTML = successHTML


      }
  }
);