function getTokens() {
  const userToken = localStorage.getItem('userToken') || '';
  return JSON.parse(userToken);
}

export default getTokens;
