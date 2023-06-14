console.log("injected");

chrome.storage.sync.get("buttonValue", function(result) {
  console.log(result.buttonValue);
});

chrome.storage.sync.get("buttonValue", function(result) {
    if (result.buttonValue === "nobutton") {
      startScript();
    }
  });
  
