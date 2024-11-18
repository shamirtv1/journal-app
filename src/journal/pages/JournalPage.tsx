import {IconButton} from "@mui/material";
import NothinSelectedView from "../views/NothinSelectedView.tsx";
import {AddOutlined} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../store";
import {startNewNote} from "../../store/journal/thunks.ts";
import NoteView from "../views/NoteView.tsx";

const JournalPage = () => {

    const dispatch = useAppDispatch();
    const { isSaving, activeNote } = useAppSelector(state => state.journal);

    const onStartNewNote = () => {
        dispatch(startNewNote())
    }

    return (
        <>

            {
                (activeNote !== null) ?
                    <NoteView/> :  <NothinSelectedView/>
            }


            <IconButton
                onClick={onStartNewNote}
                disabled={isSaving}
                size={'large'}
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': {backgroundColor: 'error.main', opacity: 0.9},
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}>

                <AddOutlined sx={{fontSize: 30}}/>
            </IconButton>

        </>
    );
};

export default JournalPage;