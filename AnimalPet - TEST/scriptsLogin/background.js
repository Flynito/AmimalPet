
function checkLoginStatus() {
  fetch('https://amimal.freeddns.org/Extension/isLoggedInExtension.php', {
      credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
      if (data.loggedIn) {
          console.log('Utilisateur connecté');
          chrome.action.setPopup({ popup: 'index.html' });
      } else {
          console.log('Utilisateur non connecté');
          chrome.action.setPopup({ popup: '' }); 
          chrome.tabs.create({ url: 'https://amimal.freeddns.org/login_extension.php' });
      }
  })
  .catch(error => {
      console.error('Erreur lors de la requête API:', error);
      chrome.action.setPopup({ popup: '' }); 
      
  });
}
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installée ou mise à jour.');
  checkLoginStatus(); 
});

checkLoginStatus();

chrome.action.onClicked.addListener((tab) => {
  checkLoginStatus();
});

