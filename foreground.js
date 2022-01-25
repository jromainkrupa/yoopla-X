toto = document.querySelector('h1').innerText
chrome.runtime.sendMessage(
  { name: toto }, 
  function(response) {
    console.log(response.farewell);
})

