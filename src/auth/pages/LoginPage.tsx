import {Link as RouterLink} from 'react-router-dom'
import {Alert, Button, Grid2, Link, TextField, Typography} from "@mui/material";

import {Google} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {startGoogleSignIn, startLoginWithEmailAndPassword} from "../../store/auth";



const LoginPage = () => {

    const { status, errorMessage } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch(); // DISPATCH DE LOS THUNKS

    const { register, handleSubmit } = useForm();





    const isAuthenticating = useMemo( ()=> status === "checking", [status]);

    const onSubmito = (userInfo: any) => {
        dispatch(startLoginWithEmailAndPassword(userInfo))
    }

    const onGoogleSignIn = () => {
        console.log("Sign in with Google");
        dispatch(startGoogleSignIn())
    }

    return (

        <Grid2 size={ 5 } sx={{backgroundColor: 'white', padding: 3, borderRadius: 2}} className={"animate__animated animate__flip"}>

            <Typography variant='h5' sx={{mb: 1}}>Acceder</Typography>

            <form onSubmit={handleSubmit(onSubmito)}>

                <Grid2 sx={{mt: 2}}>
                    <TextField
                        size="small"
                        {...register("email")}
                        name="email"
                        label="Username"
                        type="email"
                        placeholder="corre@correo.com"
                        fullWidth
                    />
                </Grid2>

                <Grid2 sx={{mt: 2}}>
                    <TextField
                        size="small"
                        {...register("password")}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        fullWidth
                    />
                </Grid2>

                <Grid2 size={12} display={ !!errorMessage ? '' : 'none' } sx={{mt: 2}}>
                    <Alert severity="error">
                        {errorMessage}
                    </Alert>
                </Grid2>

                <Grid2 container spacing={2} sx={{mt: 2}}>
                    <Grid2 size={6}>
                        <Button variant='contained' fullWidth={true} type="submit" disabled={ isAuthenticating }>
                            Login
                        </Button>
                    </Grid2>
                    <Grid2 size={6}>
                        <Button variant='contained' fullWidth={true} onClick={onGoogleSignIn} disabled={ isAuthenticating }>
                            <Google/> <Typography sx={{ml: 1}}>Google</Typography>
                        </Button>
                    </Grid2>
                </Grid2>

                <Grid2 container direction="row" justifyContent={'end'} sx={{mt: 2}}>
                    <Link component={RouterLink} color="inherit" to={'/auth/register'}>
                        Crear una cuenta
                    </Link>
                </Grid2>

            </form>

        </Grid2>

    );
};

export default LoginPage;