export const getStorageTokens = (): {
  accessToken: string | null;
  refreshToken: string | null;
} => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';
  return {
    accessToken,
    refreshToken,
  };
};
