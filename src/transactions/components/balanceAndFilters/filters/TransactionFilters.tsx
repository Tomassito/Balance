import React, {useRef} from "react";
//
import {IconButton, TextField, Typography} from "@mui/material";
//
import styles from "./TransactionFilters.module.css";

type FilterChangeCallback<T> = (filterValue: T) => any

export interface TransactionFiltersProps {
    handlers: {
        beneficiary: FilterChangeCallback<string>
    }
}


function TransactionFilters({handlers}: TransactionFiltersProps) {
    const ref = useRef<HTMLInputElement | null>(null);

    function onClearClicked() {
        if (ref.current) {
            ref.current.value = "";
            handlers.beneficiary("");
        }
    }

    return (
        <div className={styles.container}>
            <Typography variant={"h6"} className={styles.header}>Search by</Typography>
            <TextField
                label="Beneficiary"
                variant="outlined"
                onChange={e => handlers.beneficiary(e.target.value)}
                InputProps={{
                    endAdornment: (
                            <IconButton
                                onClick={onClearClicked}
                                className={styles.clearButton}
                            >✖</IconButton>
                    ),
                }}
                inputRef={ref}
            />
        </div>
    )
}

export default TransactionFilters;