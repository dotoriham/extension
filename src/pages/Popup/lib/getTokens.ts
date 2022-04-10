function getTokens() {
  const userToken = localStorage.getItem('DOTORI_USER') || '';
  return JSON.parse(userToken);
}

export default getTokens;
