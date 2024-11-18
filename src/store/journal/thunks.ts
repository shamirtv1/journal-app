import {AppDispatch, RootState} from "../store.ts";
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';
import {FirebaseDB} from "../../firebase/config.ts";
import {
    noteType,
    addNewEmptyNote, deleteNote, processNote, setActiveNote, setNotes, updateNotes
} from "./journalSlice.ts";
import {loadNotesData} from "./helpers/loadNotes.ts";


export const startNewNote = () => {
    return async (dispatch: AppDispatch, getState: ()=> RootState) => {

        dispatch(processNote(true));

        const { uid } = getState().auth; //ID DEL USUARIO AUTENTICADO EN FIREBASE

        // ESTRUCTURA DE LA NUEVA NOTA
        const newNote: noteType = {
            id: '',
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        // SE SALVAN LOS DATOS DE LA NUEVA NOTA EN FIREBASE
        const pathNewDoc = doc( collection (FirebaseDB, `${ uid }/journal/notes`) )
        newNote.id = pathNewDoc.id
        await setDoc(pathNewDoc, newNote);


        dispatch(addNewEmptyNote(newNote)); //SE RECREA UN NUEVO ESTADO EN EL ESTORAGE
        dispatch(setActiveNote(newNote)); //SE ACTIVA LA NOTA CREADA
        dispatch(processNote(false));
    }
}

export const startLoadingNotes = () =>{
    return async (dispatch: AppDispatch, getState: ()=> RootState) => {

        dispatch(processNote(true));

        const { uid } = getState().auth;
        const loadNotes: noteType[] = await loadNotesData(uid!);
        dispatch(setNotes(loadNotes));

        dispatch(processNote(false));
    }
}

export const startSaveNote = (activeNote: noteType) => {
    return async (dispatch: AppDispatch, getState: ()=> RootState) => {

        dispatch(processNote(true));

        const { uid } = getState().auth;
        //const noteToFiresTore = { ...activeNote }
        //delete (noteToFiresTore as {id?: string}).id;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`);
        await setDoc(docRef, activeNote, { merge: true });

        dispatch(updateNotes(activeNote));
        dispatch(setActiveNote(activeNote));

        dispatch(processNote(false));
    }
}

export const startDeleteNote = () => {
    return async (dispatch: AppDispatch, getState: ()=> RootState) => {

        dispatch(processNote(true));

        const { activeNote } = getState().journal;
        const { uid } = getState().auth;
        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ activeNote!.id }`);
        await deleteDoc(docRef);

        dispatch(deleteNote(activeNote!));

        dispatch(processNote(false));

    }
}