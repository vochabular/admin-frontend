import auth0, { Auth0DecodedHash, Auth0UserProfile } from "auth0-js";

import client from "ApolloClient";
import { AUTH_CONFIG } from "./auth0-variables";
import history from "../myHistory";

/**
 * This class provides methods for authorization with OAuth provider "Auth0"
 * [[include:authentication.md]]
 */
class Auth {
  accessToken: string | undefined;
  idToken: string | undefined;
  expiresAt: number;
  auth0: auth0.WebAuth;
  userProfile: Auth0UserProfile | undefined;
  allowedRoles: string[];
  currentRole: string | undefined;
  dbId: number | undefined;

  constructor() {
    this.accessToken = undefined;
    this.idToken = undefined;
    this.userProfile = undefined;
    this.expiresAt = 0;
    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain || "",
      clientID: AUTH_CONFIG.clientId || "",
      redirectUri: AUTH_CONFIG.callbackUrl,
      responseType: "token id_token",
      scope: "openid profile email"
    });
    this.getProfile = this.getProfile.bind(this);
    this.allowedRoles = [];
    this.currentRole = undefined;
    this.dbId = undefined;
  }

  public getProfile(callback: Function) {
    if (this.accessToken != null) {
      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = profile;
        }
        callback(err, profile);
      });
    }
  }

  /**
   * We also need to store the db id of the user somewhere. Bad design (should happen via a hook upon signup and store it in the JWT...)
   */
  public setDbId(dbId: number) {
    this.dbId = dbId;
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
        // navigate to the home route
        history.push("/");
        this.getProfile(() => null);
      } else if (err) {
        history.replace("/");
        console.error(err);
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
   * @returns Return current user's allowed roles.
   */
  public getAllowedRoles = (): string[] => {
    return this.allowedRoles;
  };

  /**
   * @returns Return the current set role of the current user...
   */
  public getCurrentRole = (): string | undefined => {
    return this.currentRole;
  };

  /**
   * Changes the current role of a user
   */
  public changeCurrentRole = (newRole: string): void => {
    if (this.allowedRoles.includes(newRole)) {
      this.currentRole = newRole;
      /*
      const data: any = client.readQuery({ query: GET_SETTINGS });
      // TODO: Should reset the store smartly. but not that we end up in a loop!
      client.writeData({
        data: { settings: { ...data.settings, currentRole: newRole } }
      });
      */
    } else {
      throw new Error(
        `Error: The role ${newRole} is not part of the allowed roles ${
          this.allowedRoles
        }`
      );
    }
  };

  /**
   * Updates the current session with a new access token. On error,
   */
  public renewSession = async (): Promise<void> => {
    return new Promise((resolve, reject) =>
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          this.logout();
          reject(err);
        }
      })
    );
  };

  public logout = (): void => {
    // Remove tokens and expiry time
    this.accessToken = undefined;
    this.idToken = undefined;
    this.expiresAt = 0;
    this.userProfile = undefined;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");

    // navigate to the home route
    history.replace("/");
    client.resetStore();
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
   * A user can have multiple roles, e.g. he can choose which role he currently wants.
   */
  private updateRoles = (idTokenPayload: any): void => {
    try {
      const namespace = "https://admin.vochabular.ch/jwt/claims";
      const allowedRoles = idTokenPayload[namespace]["x-allowed-roles"];
      const defaultRole = idTokenPayload[namespace]["x-default-role"];
      this.allowedRoles = allowedRoles;

      // Set current role to default role if not set or if not anymore part of roles
      if (!this.currentRole || !allowedRoles.includes(this.currentRole)) {
        this.changeCurrentRole(defaultRole);
      }
    } catch (e) {
      this.allowedRoles = [];
    }
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

    // Update the roles in memory
    this.updateRoles(authResult.idTokenPayload);
  };
}

const auth0Client = new Auth();

export default auth0Client;
