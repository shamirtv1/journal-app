import {AppDispatch} from "../store.ts";
import {checkingCredentials, login, logout} from "./authSlice.ts";
import {
    loginWithEmailAndPassword,
    logoutFirebaseAuth,
    registerUserWithEmailPassword,
    signInWithGoogle
} from "../../firebase/provider.ts";
import {clearNotesLogout} from "../journal/journalSlice.ts";

export const checkingAuthentication = () => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials())

    }
}

export const startGoogleSignIn = () => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        if( !result.ok )
            return dispatch(logout(result.errorMessage))
        dispatch( login(result) )

    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}: { email: string, password: string, displayName: string }) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

        const result = await registerUserWithEmailPassword({email, password, displayName});
        if( !result.ok ) return dispatch( logout(result.errorMessage) )

        dispatch( login(result) )
    }
}


export const startLoginWithEmailAndPassword = ({ email, password }: { email: string, password: string })=> {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredentials());

        const result = await loginWithEmailAndPassword({email, password});
        if( !result.ok ) return dispatch( logout(result.errorMessage) )

        dispatch( login(result) )

    }
}

export const startLogout = () => {
    return async (dispatch: AppDispatch) => {

        await logoutFirebaseAuth();
        dispatch(clearNotesLogout())
        dispatch( logout() )
    }
}