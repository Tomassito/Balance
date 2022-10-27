import React, {createContext, useCallback, useContext} from "react";
import {Alert, AlertColor, Button, Snackbar} from "@mui/material";

interface MainSnackbarState {
    open: boolean;
    message: string;
    type: AlertColor;
}

interface ShowSnackArgs {
    message: string;
    type?: AlertColor;
}

const initState: MainSnackbarState = {
    open: false,
    message: "",
    type: "success",
};

export const SnackBarContext = createContext<((meta: ShowSnackArgs) => void)>((meta) => {});

export function SnackBarProvider({children}: { children: React.ReactNode }) {

    const [state, setSnackbarState] = React.useState<MainSnackbarState>(initState);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarState(initState);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                OK
            </Button>
        </React.Fragment>
    );

    const showSnackbar = useCallback((meta: ShowSnackArgs) => {
        setSnackbarState({type: "success", ...meta, open: true});
    }, []);

    return (
        <SnackBarContext.Provider value={showSnackbar}>
            <>
                {children}
                <Snackbar
                    open={state.open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    action={action}
                    anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                >
                    <Alert onClose={handleClose} severity={state.type} sx={{width: "100%"}}>
                        {state.message}
                    </Alert>
                </Snackbar>
            </>
        </SnackBarContext.Provider>
    )
}

export function useSnackbar() {
   return useContext(SnackBarContext);
}