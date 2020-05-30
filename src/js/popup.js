let changeColor = document.getElementById('changeColor');
var bkg = chrome.extension.getBackgroundPage();

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {

    chrome.storage.sync.get('color', function(data) {
    let color = data.color;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.background = "' + color + '";'});
    });
    bkg.console.log('Background colour changed to: ' + color);
  });
};
  
let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        bkg.console.log('Selected color changed to: ' + item);
      })
      changeColor.style.backgroundColor = item;
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);