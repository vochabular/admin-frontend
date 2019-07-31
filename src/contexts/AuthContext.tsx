import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

import { Role } from "rbac-rules";

const namespace = "https://hasura.io/jwt/claims";

/**
 * Properties from the Auth0 IdToken + the custom defined properties (in the Auth0 Rules!)
 */
interface IUser extends IdToken {
  userId: String;
  currentRole: Role;
  allowedRoles: Role[];
}

interface IOwnIdToken extends IdToken {
  [key: string]: any;
}

/**
 * Translates decoded Auth0-Id-token into a custom, flat user object
 * @param idToken
 */
function getUserFromIdToken(idToken: IOwnIdToken): IUser {
  // Strip the namespace, since we want to have a flat user object
  const { [namespace]: customProperties, ...authProperties } = idToken;
  const allowedRoles = customProperties["x-hasura-allowed-roles"];
  const userId = customProperties["x-hasura-user-id"];
  return {
    userId,
    allowedRoles,
    currentRole: allowedRoles[0], // TODO(df): We have to initialize this somehow, then on first settings load, it has to update the current role based on the current set value.
    ...authProperties
  };
}

export interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | undefined;
  idToken: string | undefined;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: CallableFunction;
  handleRedirectCallback: CallableFunction;
  getIdTokenClaims: CallableFunction;
  /**
   * TODO(df): How do we type this properly (a Callable...)?
   */
  loginWithRedirect: CallableFunction;
  getTokenSilently: CallableFunction;
  getTokenWithPopup: CallableFunction;
  logout: CallableFunction;
  changeCurrentRole: CallableFunction;
}

const initialAuthContext: IAuthContext = {
  isAuthenticated: false,
  user: undefined,
  idToken: undefined,
  loading: true,
  popupOpen: false,
  loginWithPopup: () => console.info("Initializing..."),
  handleRedirectCallback: () => console.info("Initializing..."),
  getIdTokenClaims: () => console.info("Initializing..."),
  loginWithRedirect: () => console.info("Initializing..."),
  getTokenSilently: () => console.info("Initializing..."),
  getTokenWithPopup: () => console.info("Initializing..."),
  logout: () => console.info("Initializing..."),
  changeCurrentRole: () => console.info("Initializing...")
};

/**
 * A function that routes the user to the right place after login
 * @param appState
 */
export const onRedirectCallback = (appState: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const AuthContext = React.createContext<IAuthContext>(
  initialAuthContext
);
export const useAuth = () => useContext(AuthContext);

// TODO(df): Improve typing...
export const AuthProvider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [idToken, setIdToken] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    let initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }
      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const auth0User = await auth0FromHook.getUser();
        const user = getUserFromIdToken(auth0User);
        setUser(user);
        // TODO(df): Hack to get the id-token, since Auth0 only can return the access-token, we however need the ID token...
        const idToken =
          // @ts-ignore
          auth0FromHook.cache.cache["default::openid profile email"][
            "id_token"
          ];
        // TODO(df): Hack for now, since I have no idea how to access the context from outside React (in ApolloClient.ts)
        // @ts-ignore
        window.idToken = idToken;
        setIdToken(idToken);
      }
      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    if (!auth0Client) return null;
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
      // TODO(df): Error handling!
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(getUserFromIdToken(user));
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    if (!auth0Client) return null;
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(getUserFromIdToken(user));
  };

  const changeCurrentRole = (newRole: Role) => {
    const updatedUser: IUser = Object.assign(user!);
    updatedUser.currentRole = newRole;
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        idToken,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (p: getIdTokenClaimsOptions) =>
          auth0Client && auth0Client.getIdTokenClaims(p),
        loginWithRedirect: (p: RedirectLoginOptions) =>
          auth0Client && auth0Client.loginWithRedirect(p),
        getTokenSilently: (p: GetTokenSilentlyOptions) =>
          auth0Client && auth0Client.getTokenSilently(p),
        getTokenWithPopup: (p: GetTokenWithPopupOptions) =>
          auth0Client && auth0Client.getTokenWithPopup(p),
        logout: (p: LogoutOptions) =>
          auth0Client &&
          auth0Client.logout(p || { returnTo: window.location.origin }),
        changeCurrentRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
