import React from "react";
import {Formik, FormikHelpers} from "formik";
import {Transaction} from "../types";
//
import {Button, Paper, TextField, Typography} from "@mui/material";
//
import styles from "./NewTransaction.module.css";
import TransactionsService from "../service";
import {useSnackbar} from "../../core/providers/Snackbar.provider";


type FormValues = Omit<Transaction, "date" | "id">;
type FormKeys = keyof FormValues
export const NEW_TRANSACTION_FORM_KEYS : Record<FormKeys, FormKeys> = {
    account : "account",
    address: "address",
    amount: "amount",
    beneficiary: "beneficiary",
    description: "description",
}
export interface NewTransactionProps {
    onTransactionAdded: () => void,
}

function NewTransaction({onTransactionAdded}: NewTransactionProps) {

    const initialValues: FormValues = {
        amount: 0,
        beneficiary: "",
        account: "",
        address: "",
        description: "",
    }

    const showSnackbar = useSnackbar();

    function onFormSubmit(values: FormValues, {setSubmitting, resetForm}: FormikHelpers<FormValues>) {
        setSubmitting(true);
        TransactionsService.addTransaction(values)
            .then(
                () => {
                    onTransactionAdded();
                    resetForm();
                },
                () => showSnackbar({type: "error", message: "Error adding transaction"}))
            .finally(() =>  setSubmitting(false));
    }

    function validate(values: FormValues) {

        const errors: { [key in keyof FormValues]?: string } = {};
        for (const key in values) {
            if (!values[key as keyof FormValues]) {
                errors[key as keyof FormValues] = "Required";
            }
        }
        return errors;
    }

    return (
        <Paper variant={"outlined"}>
            <Typography className={styles.header} variant={"h6"}>New transaction</Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={onFormSubmit}
                validate={validate}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      isValid,
                  }) => {

                    function getTextFieldProps(key: keyof FormValues) {
                        return {
                            variant: "outlined",
                            name: key,
                            value: values[key],
                            onChange: handleChange,
                            onBlur: handleBlur,
                            error: touched[key] && !!errors[key],
                            helperText: touched[key] && errors[key]
                        } as const
                    }

                    return (
                        <form
                            onSubmit={handleSubmit}
                            className={styles.form}
                        >
                            <div className={styles.formBlock}>
                                <TextField
                                    label="Beneficiary"
                                    {...getTextFieldProps(NEW_TRANSACTION_FORM_KEYS.beneficiary)}
                                />
                                <TextField
                                    label="Account"
                                    {...getTextFieldProps(NEW_TRANSACTION_FORM_KEYS.account)}
                                />
                            </div>
                            <div className={styles.formBlock}>
                                <TextField
                                    label="Amount"
                                    type={"number"}
                                    {...getTextFieldProps(NEW_TRANSACTION_FORM_KEYS.amount)}
                                />
                                <TextField
                                    label="Address"
                                    {...getTextFieldProps(NEW_TRANSACTION_FORM_KEYS.address)}
                                />
                            </div>
                            <div className={styles.formBlock}>
                                <TextField
                                    label="Description"
                                    {...getTextFieldProps(NEW_TRANSACTION_FORM_KEYS.description)}
                                />
                            </div>
                            <Button type="submit" disabled={Object.keys(touched).length === 0 || !isValid || isSubmitting}>
                                Submit
                            </Button>
                        </form>
                    )
                }}
            </Formik>
        </Paper>
    )
}

export default NewTransaction;