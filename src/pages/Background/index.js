chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.tab.url.includes('dotoriham.com')) {
    chrome.storage.local.set({ DOTORI_USER: request.dotoriUsers });
  }
});
