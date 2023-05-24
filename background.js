chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({passwordLength: 12}, function() {
      console.log('Password\'s length set to 12');
    });
  });
  