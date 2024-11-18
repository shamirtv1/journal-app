
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface noteType {
    id: string;
    title: string;
    body: string;
    date: number;
    imageUrls: string[];
}

interface journalState {
    isSaving: boolean;
    saveMessage: string;
    notes: noteType[];
    activeNote: noteType | null;
}

const initialState: journalState = {
    isSaving: false,
    saveMessage: '',
    notes: [],
    activeNote: null,
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        processNote: (state, action: PayloadAction<boolean>) => {
            state.isSaving = action.payload;
        },
        addNewEmptyNote: (state, action: PayloadAction<noteType>) => {
            state.notes.push(action.payload);
        },
        setActiveNote: (state, action: PayloadAction<noteType>) => {
            state.activeNote = action.payload;
        },
        setNotes: (state, action: PayloadAction<noteType[]>) => {
            state.notes = action.payload;
        },
        updateNotes: (state, action: PayloadAction<noteType>) => {
            state.notes = state.notes.map(note =>
                (note.id === action.payload.id) ? action.payload : note
            );
        },
        clearNotesLogout: (state:  journalState)  => {
            state.isSaving = false;
            state.saveMessage = '';
            state.notes = [];
            state.activeNote = null;
        },
        deleteNote: (state, action: PayloadAction<noteType>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload.id);
            state.activeNote = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    setActiveNote,
    processNote,
    setNotes,
    updateNotes,
    clearNotesLogout,
    deleteNote
} = journalSlice.actions;