var bkg = chrome.extension.getBackgroundPage();

colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
  let color = event.target.value;
  chrome.storage.sync.set({color: event.target.value}, function() {
    bkg.console.log('color is ' + event.target.value);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.background = "' + color + '";'});
    });
  })
}
