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
          document.getElementById("name").innerHTML = request.name;
          document.getElementById("jobTitle").innerHTML = request.current_job_title;
        
          button = document.getElementById("sendButton")
          if (button) {
            document.addEventListener('click', () => {
        
              chrome.runtime.sendMessage({
                message: 'fetch',
                first_name: request.name, 
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


    // chrome.storage.local.set({ user_token: cookie.value, logged_in: true });
    // chrome.action.setPopup({popup: 'popup.html'})
  } else {
    document.querySelector('body').innerHTML = notConnectedToYooplaHTML
  }
})