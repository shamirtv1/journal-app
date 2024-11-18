import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from "./auth";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {journalSlice} from "./journal/journalSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        journal: journalSlice.reducer
    },
})

export const useAppDispatch:()=>typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store['dispatch']