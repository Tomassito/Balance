import React from "react";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material";
//
import "./App.css";
import Transactions from "./transactions";
import {SnackBarProvider} from "./core/providers/Snackbar.provider";
import Header from "./core/components/Header";

const theme = responsiveFontSizes(
    createTheme({
        components: {
            MuiPaper: {
                defaultProps: {
                    elevation: 5,
                },
                styleOverrides: {
                    root: {
                        padding: "min(2.5vmin, 16px) min(5vmin, 32px)",
                    },
                },
            },
        },
    })
);

function App() {

    return (
        <ThemeProvider theme={theme}>
            <SnackBarProvider>
                <div className="App">
                    <Header/>
                    <Transactions/>
                </div>
            </SnackBarProvider>
        </ThemeProvider>
    );
}

export default App;
