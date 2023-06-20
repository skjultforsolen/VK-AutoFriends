console.log("injected");

setTimeout(function() {
    chrome.storage.sync.get("statusKey", function(result) {
        var statusValue = result.statusKey;
        
        
        if (statusValue === "nobutton") {
            console.log("Значение ключа statusKey:", statusValue);
            startScript();
        }
        });     

    }, 1000);

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
        });
        alert("Скрипт остановлен - лимит достигнут");    
        } else {
        chrome.storage.sync.set({ "buttonValue": "button" }); // кнопка есть
        }
    }
    
    const interval = setInterval(checkAndClickButton, 1000); // Проверять и нажимать кнопку каждую секунду
    }   