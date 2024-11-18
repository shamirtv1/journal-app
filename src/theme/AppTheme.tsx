import {ThemeProvider} from "@emotion/react";
import {CssBaseline} from "@mui/material";
import purpleTheme from "./purpleTheme.tsx";
import {ReactNode} from "react";


const AppTheme = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider theme={ purpleTheme }>
            <CssBaseline/>
            { children }
        </ThemeProvider>
    );
};

export default AppTheme;