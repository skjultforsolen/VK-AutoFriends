var getDivWithFriends, parser, doc, aTags, findLikeBtn;

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click",() => {
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0];
    if (tab) {
        chrome.scripting.executeScript(
            {
                target:{tabId: tab.id, allFrames: true},
                func:startScript
            }
        )
    } else {
        alert("There are no active tabs")
    }
})
})

function startScript() {

  function checkAndClickButton() {
    const boxLayout = document.querySelector('.box_layout');
    const button = document.querySelector('.vkuiIconButton.vkuiIconButton--sizeY-compact.vkuiTappable.vkuiTappable--sizeX-regular.vkuiTappable--hasHover.vkuiTappable--hasActive.vkuiTappable--mouse');
    if (button) {
      button.click();
      chrome.storage.sync.set({statusKey: "button" }, function() {
        console.log("Ключ успешно создан - кнопка есть");
      });    
    } else {
      chrome.storage.sync.set({statusKey: "nobutton" }, function() {
        console.log("Ключ успешно создан - кнопки нет");
        setTimeout(function() {
          location.reload();
        }, 1000); // Задержка в 1 секунду (1000 миллисекунд)
      });    
    }

    if (boxLayout) {
      // Очищать локальное хранилище чтобы не запускался скрипт
      clearInterval(interval);
      chrome.storage.sync.set({statusKey: "button" }, function() {
        console.log("Скрипт остановлен - лимит достигнут");
      alert("Скрипт остановлен - лимит достигнут");
    }); 
    } else {
      chrome.storage.sync.set({ "buttonValue": "button" }); // кнопка есть
    }
  }

  const interval = setInterval(checkAndClickButton, 1000); // Проверять и нажимать кнопку каждую секунду
}

/* скрипт должен выполнять пока не будет ошибки box layot*/ 
