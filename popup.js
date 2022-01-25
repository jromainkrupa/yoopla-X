  

  // console.log('in popup.js');
  

  // // retrieving current tab
  // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  //   // depending on current tab url
  //   // use `url` here inside the callback because it's asynchronous
  //   let url = tabs[0].url;
    
  //   // depending if user is on a linkedin profile url
  //   if (url.match(/https:\/\/www.linkedin.com\/in/)) {
  //     // set the import candidate popup
  //     console.log('on linkedin profile should display popup');
  //     let text = document.querySelector('#text')
  //     text.innerHTML = 'you are on linkedin <button id="parse">Click me</button>'
  //     button = document.querySelector('#parse')
  //     const name = document.querySelector('h1')
  //     console.log(name);
      

      

  //   } else {
  //     // set the popup to prompt the user to go on linkedin. 
  //     console.log('on linkedin profile should display popup');
  //     let text = document.querySelector('#text')
  //     text.innerHTML = 'you are NOT on linkedin'

  //     // chrome.action.setPopup({popup: 'popup_not_linkedin.html'})
  //   }
    
  // });