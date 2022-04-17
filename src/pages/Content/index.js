import { printLine } from './modules/print';

printLine("Using the 'printLine' function from the Print Module");

// dotoriham.com 의 accessToken을 가져옴
const dotoriUsers = localStorage.getItem('DOTORI_USER');

chrome.runtime.sendMessage(
  { dotoriUsers: JSON.parse(dotoriUsers) },
  function (response) {},
);
