// background.js
console.log('Это скрипт в Manifest Version 3.');

// Ждем 1 секунду (1000 миллисекунд)
setTimeout(function() {
    // Получаем значение из chrome.storage.sync
    chrome.storage.sync.get("buttonValue", function(result) {
      console.log(result.buttonValue);
    });
  }, 1000);
  

// Ваш код здесь
