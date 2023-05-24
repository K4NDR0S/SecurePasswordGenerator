chrome.runtime.onInstalled.addListener(function() {
    // password starting value
    chrome.storage.sync.set({passwordLength: 12}, function() {
      console.log('Password\'s length set to 12');
    });
  });
  