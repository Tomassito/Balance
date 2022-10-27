import React, {useMemo} from "react";
//
import {Typography} from "@mui/material";
//
import {Transaction} from "../../../types";
import styles from "./Balance.module.css";

interface BalanceProps {
    transactions: Transaction[]
}


function Balance({transactions} : BalanceProps) {


    const totalMoneyRound = useMemo(() => {
        const totalMoney = transactions.reduce((total, t) => total + t.amount, 0);
        return Math.round(totalMoney * 100) / 100;
    }, [transactions]);
    return (
        <div className={styles.container}>
            <Typography variant={"h6"}>Total balance</Typography>
            <div>{totalMoneyRound}</div>
        </div>
    )
}

export default Balance;