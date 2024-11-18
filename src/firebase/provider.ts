import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from 'firebase/auth'
import {FirebaseAuth} from "./config.ts";


const goolgleProvider = new GoogleAuthProvider();



export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, goolgleProvider);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            displayName, email, photoUrl: photoURL, uid
        }

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        //const email = error.customData.email;
        //const credentials = GoogleAuthProvider.credentialFromError(error)
        return {
            ok: false,
            errorMessage,
            errorCode
        }
    }
}

export const registerUserWithEmailPassword = async (
    {email, password, displayName}: { email: string, password: string, displayName: string }
) => {
    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        await updateProfile(FirebaseAuth.currentUser!, { displayName });

        return {
            ok: true,
            uid, photoUrl:  photoURL, displayName, email
        }

    }catch(error: any) {
        return { ok: false, errorMessage: error.message };
    }
}


export const loginWithEmailAndPassword = async (x: { email: string, password: string }) => {
    try {

        const result  = await signInWithEmailAndPassword(FirebaseAuth, x.email, x.password);
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            displayName, email, photoUrl: photoURL, uid
        }

    }catch(error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,
            errorCode
        }
    }
}

export const logoutFirebaseAuth = async () => {
    return await FirebaseAuth.signOut();
}