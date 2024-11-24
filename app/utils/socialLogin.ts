import auth from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
// import {
//   LoginManager,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   Settings,
// } from "react-native-fbsdk-next";
// import { Platform } from "react-native";

// ********************************* GOOGLE LOGIN ******************************
export const googleConfiguration = () => {
  GoogleSignin.configure({
    offlineAccess: true,
    webClientId:
      "265155772290-dp123omjh85r8gogr56046adbpmfrs3d.apps.googleusercontent.com",
    iosClientId:
      "265155772290-kc0791geqicvjaf156bumperbnn1fhvn.apps.googleusercontent.com",
  });
};

export const googleLogin = async (callback: any) => {
  // If user already login with then first logout the user.
  await GoogleSignin.signOut();

  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo?.idToken
    );

    const firebaseToken = await getUserAccessToken(googleCredential);

    callback(firebaseToken, userInfo.user?.email);
  } catch (error: any) {
    console.log("google error", error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("google error SIGN_IN_CANCELLED", JSON.stringify(error));
      //reject(error);
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("google error IN_PROGRESS", JSON.stringify(error));
      // reject(error);
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log(
        "google error PLAY_SERVICES_NOT_AVAILABLE",
        JSON.stringify(error)
      );
      // reject(error);
      // play services not available or outdated
    } else {
      console.log("google error", JSON.stringify(error));
      // reject(error);
      // some other error happened
    }
  }
};
// ********************************* APPLE LOGIN ******************************

export const appleLogin = async (callback: any) => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error("Apple Sign-In failed - no identify token returned");
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;

  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce
  );

  const firebaseToken = await getUserAccessToken(appleCredential);
  const email = auth().currentUser?.email;
  console.log(
    "APplleeee=====",
    auth().currentUser,
    JSON.stringify(appleAuthRequestResponse)
  );
  callback(firebaseToken);
  // Sign the user in with the credential
};

export const revokeSignInWithAppleToken = async () => {
  // Get an authorizationCode from Apple
  const { authorizationCode } = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.REFRESH,
  });

  // Ensure Apple returned an authorizationCode
  if (!authorizationCode) {
    throw new Error("Apple Revocation failed - no authorizationCode returned");
  }

  // Revoke the token
  return auth().revokeToken(authorizationCode);
};

// ********************************* FACEBOOK LOGIN ******************************

// export const configureFacebook = () => {
//   // setting up the app ID
//   Settings.setAppID("1357421871573504");
//   Settings.initializeSDK();
// };

// export const facebookLogin = async (callback: any) => {
//   LoginManager.logOut();
//   if (Platform.OS === "android") {
//     LoginManager.setLoginBehavior("web_only");
//   }

//   // LoginManager.logOut();
//   LoginManager.logInWithPermissions(["public_profile", "email"])
//     .then((result: any) => {
//       if (result.isCancelled) {
//         console.log("facebook Login cancelled");
//       }
//     })
//     .then(() => {
//       const infoRequest = new GraphRequest(
//         "/me?fields=id,name,email,picture",
//         undefined,
//         (error: any, response: any) => {
//           if (error) {
//             console.log("Error fetching data: ", error);
//           } else {
//             //   console.log('fetching data facebook>>>', result);
//             //   resolve(result);
//             AccessToken.getCurrentAccessToken().then(async (data: any) => {
//               let token = data.accessToken.toString();

//               const facebookCredential =
//                 auth.FacebookAuthProvider.credential(token);

//               const firebaseToken = await getUserAccessToken(
//                 facebookCredential
//               );
//               callback(firebaseToken, response?.email);
//             });
//           }
//         }
//       );
//       new GraphRequestManager().addRequest(infoRequest).start();
//     })
//     .catch((err) => console.log(err));
// };

const getUserAccessToken = (credential: any) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithCredential(credential)
      .then((_) => {
        auth()
          .currentUser?.getIdToken()
          .then((token) => resolve(token))
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
};
