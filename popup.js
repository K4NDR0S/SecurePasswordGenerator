document.addEventListener('DOMContentLoaded', function() {
    var generateButton = document.getElementById('generateButton');
    var passwordLengthInput = document.getElementById('passwordLengthInput');
    var includeSpecialCharsCheckbox = document.getElementById('includeSpecialCharsCheckbox');
    var passwordOutput = document.getElementById('passwordOutput');
  
    
    chrome.storage.sync.get(['passwordLength', 'includeSpecialChars'], function(data) {
      passwordLengthInput.value = data.passwordLength;
      includeSpecialCharsCheckbox.checked = data.includeSpecialChars;
    });
  
    generateButton.addEventListener('click', function() {
      var passwordLength = parseInt(passwordLengthInput.value);
      var includeSpecialChars = includeSpecialCharsCheckbox.checked;
  
      
      chrome.storage.sync.set({ passwordLength: passwordLength, includeSpecialChars: includeSpecialChars }, function() {
        console.log('Długość hasła ustawiona na: ' + passwordLength);
        console.log('Znaki specjalne: ' + includeSpecialChars);
  
        
        var password = generatePassword(passwordLength, includeSpecialChars);
  
        
        chrome.runtime.sendMessage({ password: password });
  
        
        passwordOutput.innerHTML = '<span id="passwordText">' + password + '</span><button id="copyButton">Copy to clipboard</button>';
        passwordOutput.style.display = 'block';
  
        var copyButton = document.getElementById('copyButton');
        copyButton.addEventListener('click', function() {
          copyToClipboard(password);
        });
      });
    });
  
    passwordOutput.addEventListener('mouseover', function() {
      var copyButton = document.getElementById('copyButton');
      copyButton.style.display = 'block';
    });
  
    passwordOutput.addEventListener('mouseout', function() {
      var copyButton = document.getElementById('copyButton');
      copyButton.style.display = 'none';
    });
  });
  
  function generatePassword(length, includeSpecialChars) {
    var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    if (includeSpecialChars) {
      charset += '!@#$%^&*()_-+=[]{}|\\:;\"\'<>,.?/~`';
    }
  
    var password = '';
  
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
  }
  
  function copyToClipboard(text) {
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
  