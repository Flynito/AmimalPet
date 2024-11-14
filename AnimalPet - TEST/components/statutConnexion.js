document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: 'checkLoginStatus' });
  });
  