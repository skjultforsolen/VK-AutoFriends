console.log("injected");

chrome.storage.sync.get("buttonValue", function(result) {
    if (result.buttonValue === "nobutton") {
      setTimeout(function() {
        location.reload();
      }, 1000);
    }
  });
  
