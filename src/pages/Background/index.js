chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.tab.url.includes('dotoriham.com')) {
    chrome.storage.local.set({ DOTORI_USER: request.dotoriUsers });
  }
  console.log('Zz');
  // 페이지 이동
  if (request.cmd === 'openTab') {
    chrome.tabs.update({ url: request.url });
  }
});
