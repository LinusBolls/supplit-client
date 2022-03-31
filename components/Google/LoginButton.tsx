import React, { useState } from "react";
import { useGoogleLogin } from "react-google-login";

import { refreshTokenSetup } from "./refreshToken";
import style from "./index.module.css";

const onSuccess = (res: any) => {
  console.log("Login Success: currentUser:", res.profileObj);
  alert(
    `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
  );
  refreshTokenSetup(res);
};
const onFailure = (res: any) => {
  console.log("Login failed: res:", res);
  alert(
    `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
  );
};
const options = {
  onSuccess,
  onFailure,
  clientId: process.env.CLIENT_ID as string,
  isSignedIn: true,
  accessType: "offline",
};
function GoogleLoginButton() {
  const [test, setTest] = useState(0);

  const { signIn } = useGoogleLogin(options);

  return (
    <button onClick={signIn} className={style["google-button"]}>
      <i className="fab fa-google" />
      <span className={style["google-button__text"]}>Login with Google</span>
    </button>
  );
}
export default GoogleLoginButton;
