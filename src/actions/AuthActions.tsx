

import * as Types from "../types/AuthTypes";
import { UserManager, WebStorageStateStore, Log } from "oidc-client-ts";
/*
export const createOidcManager = (authority: string,
    client_id: string,
    redirect_uri: string,
    silent_redirect_uri: string,
    post_logout_redirect_uri: string,
    scope: string,
    history: any,
    onUserLoaded: ((user: any) => void),
    onUserUnloaded: (() => void),
    onUserSignedOut: (() => void),
    onSilentRenewError: ((error: any) => void),
    onAccessTokenExpiring: ((error: any) => void),
    onAccessTokenExpired: ((error: any) => void)) => dispatch =>
{
    var mgr = new UserManager({
        authority: authority,
        client_id: client_id,
        redirect_uri: redirect_uri,
        silent_redirect_uri: silent_redirect_uri,
        post_logout_redirect_uri: post_logout_redirect_uri,
        response_type: 'code',
        scope: scope,
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        userStore: new WebStorageStateStore({store: window.localStorage}),
        revokeAccessTokenOnSignout: true

    });
    mgr.events.addUserLoaded(onUserLoaded);
    mgr.events.addUserSignedOut(onUserSignedOut);
    mgr.events.addUserUnloaded(onUserUnloaded);
    mgr.events.addSilentRenewError(onSilentRenewError);
    mgr.events.addAccessTokenExpired(onAccessTokenExpired);
    mgr.events.addAccessTokenExpiring(onAccessTokenExpiring);

    dispatch(createOidcManagerInt(mgr, history));
   // return new Promise(() => redirect(user.state, history));

    return mgr.getUser().then(
        (usr) => dispatch(signinRedirectUser(usr))
    );
}*/

export function signinRedirectUser(user: any) : Types.AuthSigninAction
{
	return {
		type: Types.AUTH_SIGNIN,
		user: user
	};
}

function redirect(path, history)
{
	history.push(path);
}

export const signinRedirect = (user: any, history: any) => dispatch =>
{
	dispatch(signinRedirectUser(user));
	return new Promise(() => redirect(user.state, history));
};



export function silentRenew() : Types.AuthSilentRenewAction
{
	return {
		type: Types.AUTH_SILENTRENEW,

	};
}

export function signoutRedirectUser() : Types.AuthSignoutAction
{
	return {
		type: Types.AUTH_SIGNOUT,
		user: null,
	};
}

export const signoutRedirect = (history?: any) => dispatch =>
{
	dispatch(signoutRedirectUser());
	return new Promise(() => redirect("/", history));
};


