import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    status: string | null;
    uid?: string | null;
    email?: string | null;
    displayName?: string | null;
    photoUrl?: string | null;
    errorMessage?: string | null | undefined;
}

const initialState: AuthState = {
    status: "not-authenticated", //cheking, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<Partial<AuthState>>) => {
            state.status = "authenticated";
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoUrl = action.payload.photoUrl;
            state.errorMessage = null;
        },
        logout: (state, { payload }: {payload?: string}) => {
            state.status = "not-authenticated";
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoUrl = null;
            state.errorMessage = payload ? payload : null;
        },
        checkingCredentials: (state) => {
            state.status = "checking"
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoUrl = null;
            state.errorMessage = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;