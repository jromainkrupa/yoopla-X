// retrieving infos from local storage to insert into popup.html
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

      // fetch("http://localhost:3000/api/v1/hunter/candidates", {
      //   method: "POST",
      //   headers: {
      //     'X-User-Token': request.user_token,
      //     'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     first_name: request.name, 
      //     current_job_title: request.current_job_title,
      //     linkedin_url: request.linkedin_url})
      // })
      // .then((response) => {
      //   if (response.ok) {
      //     return response.json()
      //   } else {          
      //     console.log(response.status);
          
      //     throw new Error(response.status)
      //   }
      // })
      // .then((responseJson) => {
      //   console.log(responseJson);
      // })
      // .catch((error) => {
      //   console.log(error);
        
      // })
    })
  }
});