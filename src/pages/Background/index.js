chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('asdasd', request.dotoriUsers);
  if (sender.tab.url.includes('dotoriham.com')) {
    chrome.storage.local.set({ DOTORI_USER: request.dotoriUsers });
  }
});
