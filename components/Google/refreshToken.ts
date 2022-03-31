export const refreshTokenSetup = (res: any) => {
  let refreshIntervalMs = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();

    refreshIntervalMs = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    console.log("newAuthRes:", newAuthRes);

    localStorage.setItem("authToken", newAuthRes.id_token);

    setTimeout(refreshToken, refreshIntervalMs);
  };
  setTimeout(refreshToken, refreshIntervalMs);
};
