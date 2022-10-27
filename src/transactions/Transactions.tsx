import React, {useEffect, useMemo, useState} from "react";
import _debounce from "lodash/debounce";
//
import {Grid, Paper} from "@mui/material";
//
import TransactionTable from "./components/TransactionTable";
import {Transaction} from "./types";
import styles from "./Transactions.module.css";
import {Balance, Filters} from "./components/balanceAndFilters";
import {TransactionFiltersProps} from "./components/balanceAndFilters/filters/TransactionFilters";
import NewTransaction from "./components/NewTransaction";
import TransactionsService from "./service";
import {useSnackbar} from "../core/providers/Snackbar.provider";

function Transactions() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [beneficiarySearchPhrase, setBeneficiarySearchPhrase] = useState("");

    useEffect(() => {
        return () => {
            TransactionsService.getTransactions()
                .then(data => setTransactions(data))
        };
    }, []);

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t =>
            t.beneficiary.toLocaleLowerCase()
                .includes(beneficiarySearchPhrase.toLocaleLowerCase())
        );
    }, [transactions, beneficiarySearchPhrase]);

    const filterHandlers: TransactionFiltersProps["handlers"] = {
        beneficiary: useMemo(() => _debounce((searchString) => setBeneficiarySearchPhrase(searchString.trim()), 300), [])
    }

    const showSnackbar = useSnackbar();

    function handleNewTransactionAdded() {
        TransactionsService.getTransactions()
            .then(data => setTransactions(data))
            .then(() => showSnackbar({message: "Transaction added"}));
    }

    function handleTransactionDeleted() {
        TransactionsService.getTransactions()
            .then(data => setTransactions(data))
            .then(() => showSnackbar({message: "Transaction deleted"}));
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={2}>
                <Grid item sm={5} xs={12} order={{xs: 2, sm: 1}}>
                    <Paper variant={"outlined"} className={styles.balanceFilterContainer}>
                        <Balance transactions={filteredTransactions}/>
                        <Filters handlers={filterHandlers}/>
                    </Paper>
                </Grid>
                <Grid item sm={7} order={{xs: 1, sm: 2}}>
                    <NewTransaction onTransactionAdded={handleNewTransactionAdded}/>
                </Grid>
            </Grid>
            <TransactionTable
                transactions={filteredTransactions}
                onTransactionDeleted={handleTransactionDeleted}
            />
        </div>
    )
}

export default Transactions;