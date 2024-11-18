import {useAppDispatch, useAppSelector} from "../store";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {FirebaseAuth} from "../firebase/config.ts";
import {login, logout} from "../store/auth";
import {startLoadingNotes} from "../store/journal/thunks.ts";

const UseCheckAuth = () => {

    const { status } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch(); // DISPATCH DE LOS THUNKS

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if ( !user ) return dispatch( logout() );
            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoUrl: photoURL }) );
            dispatch( startLoadingNotes() );
        });
    }, [])
    return {
        status
    }
};

export default UseCheckAuth;