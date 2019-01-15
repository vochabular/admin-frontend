import auth0, {
  Auth0DecodedHash,
  Auth0Error,
  Auth0ParseHashError
} from "auth0-js";

import { AUTH_CONFIG } from "./auth0-variables";
import history from "../history";

/**
 * This class provides methods for authorization with OAuth provider "Auth0"
 * [[include:authentication.md]]
 */
class Auth {
  accessToken: string | undefined;
  idToken: string | undefined;
  expiresAt: number;
  auth0: auth0.WebAuth;

  constructor() {
    (this.accessToken = undefined),
      (this.idToken = undefined),
      (this.expiresAt = 0),
      (this.auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain || "",
        clientID: AUTH_CONFIG.clientId || "",
        redirectUri: AUTH_CONFIG.callbackUrl,
        responseType: "token id_token",
        scope: "openid"
      }));
  }

  /**
   * Attempts to authorize a user. If the user is already "known", Auth0 Silent Auth kicks in:
   * https://auth0.com/docs/api-auth/tutorials/silent-authentication
   */
  public login = (): void => {
    // Need this prompt, as otherwise Auth0 Silent-Login kicks in...
    this.auth0.authorize({
      prompt: "login"
    });
  };

  /**
   * Parses the auth result consisting of 2 tokens and if successful, sets the "session".
   * On error, redirects and sends notification
   */
  public handleAuthentication = (): void => {
    // TODO: How to type this properly? This didn't work: `
    // `this.auth0.parseHash((err: Auth0Error, authResult: Auth0DecodedHash)...`
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace("/");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  /**
   * @returns Return the access token used for authentication of requests.
   */
  public getAccessToken = (): string | undefined => {
    return this.accessToken;
  };

  /**
   * @returns Return the id token used for refreshing access tokens.
   */
  public getIdToken = (): string | undefined => {
    return this.idToken;
  };

  /**
   * @returns Return current user's roles.
   */
  public getRoles = (): Array<string> => {
    // TODO: Implement role retrieval logic
    return ["user"];
  };

  /**
   * Updates the current session with a new access token. On error,
   */
  public renewSession = (): void => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.errorDescription}).`
        );
      }
    });
  };

  public logout = (): void => {
    // Remove tokens and expiry time
    this.accessToken = undefined;
    this.idToken = undefined;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");

    // navigate to the home route
    history.replace("/");
  };

  /**
   * Checks wether the access token is still valid (not expired)
   * @returns A boolean wether the access token is still valid
   */
  public isAuthenticated = (): boolean => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  };

  /**
   *
   * @param authResult
   */
  private setSession = (authResult: Auth0DecodedHash): void => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn! * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the home route
    history.replace("/");
  };
}

const auth0Client = new Auth();

export default auth0Client;
