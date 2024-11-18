import {Button, Grid, TextField, Typography} from "@mui/material";
import {DeleteOutlined, SaveOutlined} from "@mui/icons-material";
import ImageGallery from "../components/ImageGallery.tsx";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect, useMemo} from "react";
import {startDeleteNote, startSaveNote} from "../../store/journal/thunks.ts";
import {noteType} from "../../store/journal/journalSlice.ts";
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const NoteView = () => {

    const { activeNote, isSaving } = useAppSelector(state => state.journal);
    const dispatch = useAppDispatch();

    const {register, reset, handleSubmit, getValues } = useForm({
        defaultValues: activeNote as noteType
    });

    const dateString = useMemo(() => {
        const newDate = new Date(activeNote!.date);
        return newDate.toUTCString();
    }, [activeNote])

    useEffect(() => reset(activeNote as noteType), [activeNote]);


    const onSaveNote = () => {
        dispatch(startSaveNote(getValues() as noteType)).then(()=>{
            Toast.fire({
                icon: "success",
                title: "Nota actualizada con exito"
            });
        })
    }

    const onDelete = () => {
        if(confirm("Esta seguro de eliminar esta nota"))
            dispatch(startDeleteNote()).then(() => {
                Toast.fire({
                    icon: "success",
                    title: "Nota eliminada con exito"
                });
            })

    }

    return (

        <form onSubmit={handleSubmit(onSaveNote)}>

            <Grid
                className="animate__animated animate__fadeInUp"
                container={true}
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{mb: 1}}
            >


                <Grid item={true}>
                    <Typography fontSize={39} fontWeight={'light'}>{dateString}</Typography>
                </Grid>


                <Grid item>
                    <Button disabled={isSaving} color="primary" sx={{padding: 2}} type={'submit'}>
                        <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                        Guardar
                    </Button>
                </Grid>

                <Grid item>
                    <Button disabled={isSaving} color="error" sx={{padding: 2}} onClick={onDelete}>
                        <DeleteOutlined sx={{fontSize: 30, mr: 1}}/>
                        Delete
                    </Button>
                </Grid>

                <Grid container>
                    <TextField
                        {...register("title")}
                        type={'text'}
                        name={'title'}
                        variant="filled"
                        fullWidth={true}
                        placeholder={'Nome do nome'}
                        label={'Titulo'}
                        sx={{border: 'none', mb: 1}}
                    />

                    <TextField
                        {...register("body")}
                        type={'text'}
                        name={'body'}
                        multiline={true}
                        minRows={5}
                        variant="filled"
                        fullWidth={true}
                        placeholder={'Que sucedio el dia de hoy?'}
                        label={'Titulo'}
                        sx={{border: 'none', mb: 1}}
                    />
                </Grid>

                <ImageGallery/>

            </Grid>

        </form>

    );
};

export default NoteView;