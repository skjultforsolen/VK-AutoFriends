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
  chrome.storage.sync.set({ "buttonValue": "button" });

  function checkAndClickButton() {
    const button = document.querySelector('.vkuiIconButton.vkuiIconButton--sizeY-compact.vkuiTappable.vkuiTappable--sizeX-regular.vkuiTappable--hasHover.vkuiTappable--hasActive.vkuiTappable--mouse');
    const boxLayout = document.querySelector('.box_layout');

    if (button) {
      button.click();
    } else {
      chrome.storage.sync.set({ "buttonValue": "nobutton" }, function() {
        console.log("Value updated to 'nobutton'");
        setTimeout(function() {
        location.reload();
        }, 1000);
      });
    }

    if (boxLayout) {
      // Очищать локальное хранилище чтобы не запускался скрипт
      clearInterval(interval);
    } else {
      chrome.storage.sync.set({ "buttonValue": "button" }); // кнопка есть
    }
  }

  const interval = setInterval(checkAndClickButton, 1000); // Проверять и нажимать кнопку каждую секунду
}

