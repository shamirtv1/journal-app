import {Alert, Button, Grid2, Link, TextField, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useAppDispatch, useAppSelector} from "../../store";
import {startCreatingUserWithEmailPassword} from "../../store/auth";
import {useMemo} from "react";


const schema = yup
    .object({
        displayName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required()
    }).required()

type Inputs = {
    displayName: string,
    email: string,
    password: string
}

const RegisterPage = () => {

    const { status,  errorMessage } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch(); // DISPATCH DE LOS THUNKS

    const isCheckingAuthentication = useMemo( ()=> status === "checking", [status]);

    const { register, handleSubmit, formState: { errors, isValid }, } = useForm<Inputs>({
        resolver: yupResolver(schema),
    })



    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        if (!isValid) return;
        dispatch(startCreatingUserWithEmailPassword(data));
    }

    return (
        <Grid2 size={ 5 } sx={{backgroundColor: 'white', padding: 3, borderRadius: 2}}>

            <Typography variant='h5' sx={{mb: 1}}>Crear nueva cuenta</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>

                <Grid2 sx={{mt: 2}}>
                    <TextField
                        size="small"
                        {...register("displayName")}
                        label="Nombre completo"
                        type="text"
                        placeholder="Will Smit"
                        fullWidth
                        error={!!errors.displayName}
                        helperText={errors.displayName?.message}
                    />

                </Grid2>

                <Grid2 sx={{mt: 2}}>
                    <TextField
                        size="small"
                        {...register("email")}
                        label="Correo electronico"
                        type="email"
                        placeholder="email@correo.com"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid2>

                <Grid2 sx={{mt: 2}}>
                    <TextField
                        size="small"
                        label="Password"
                        type="password"
                        {...register("password")}
                        placeholder="Password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Grid2>

                <Grid2 container spacing={2} sx={{mt: 2}}>

                    <Grid2 size={12} display={ !!errorMessage ? '' : 'none' }>
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>
                    </Grid2>

                    <Grid2 size={12}>
                        <Button
                            disabled={ isCheckingAuthentication }
                            variant='contained'
                            fullWidth={true}
                            type={'submit'}
                        >
                            Crear cuenta
                        </Button>
                    </Grid2>
                </Grid2>

                <Grid2 container direction="row" justifyContent={'end'} sx={{mt: 2}}>
                    <Link component={RouterLink} color="inherit" to={'/auth/login'}>
                        Ya tengo una cuenta
                    </Link>
                </Grid2>

            </form>

        </Grid2>
    );
};

export default RegisterPage;