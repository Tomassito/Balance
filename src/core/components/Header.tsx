import React from "react";
import {useLottie} from "lottie-react";
//
import lottie from "../../assets/lottie/wallet.json";
import {Paper, Typography} from "@mui/material";
import styles from "./Header.module.css";

interface HeaderProps {

}


function Header(props: HeaderProps) {

    const {View: Lottie} = useLottie({
        animationData: lottie,
        loop: false,
        style: {maxWidth: "600px"}
    })
    return (
        <Paper className={styles.container} elevation={5}>
            <Typography variant={"h2"} className={styles.headerText}>Balance</Typography>
            <div className={styles.lottieContainer}>
                {Lottie}
            </div>
        </Paper>
    )
}

export default Header;