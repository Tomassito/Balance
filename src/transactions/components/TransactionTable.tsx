import React, {useState} from "react";
//
import {DataGrid, GridColDef, GridSelectionModel} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
//
import {Transaction} from "../types";
import styles from "./TransactionTable.module.css";
import TransactionsService from "../service";
import {useSnackbar} from "../../core/providers/Snackbar.provider";
import {Paper} from "@mui/material";

interface TransactionTableProps {
    transactions: Transaction[];
    onTransactionDeleted: () => void;
}

const columns: GridColDef[] = [
    {
        field: "beneficiary",
        headerName: "Beneficiary",
        flex: 1,
        minWidth: 200,
    },
    {
        field: "amount",
        headerName: "Amount",
        flex: 1,
        minWidth: 200,
    },
    {
        field: "account",
        headerName: "Acc. no.",
        flex: 1,
        minWidth: 300,
    },
    {
        field: "address",
        headerName: "Address",
        flex: 1,
        minWidth: 300,
    },
    {
        field: "description",
        headerName: "Description",
        flex: 1,
        minWidth: 300,
    },
]

function TransactionTable({transactions, onTransactionDeleted}: TransactionTableProps) {

    const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
    const showSnackbar = useSnackbar();


    function onRowSelected(selectedIds: GridSelectionModel) {
        const selectedId = selectedIds[0] as number;
        const selectedTransactionId = transactions.find(t => t.id === selectedId)?.id;
        setSelectedTransactionId((typeof selectedTransactionId === "number") ? selectedTransactionId : null);
    }

    function onDeleteClicked() {
        if ((selectedTransactionId !== null) && window.confirm("Are you sure you want to delete selected transaction?")) {
            TransactionsService.deleteTransaction(selectedTransactionId)
                .then(
                    onTransactionDeleted,
                    () => showSnackbar({type: "error", message: "Error deleting transaction"})
                )
        }
    }

    return (
        <Paper variant={"outlined"} className={styles.container}>
            <Button
                className={styles.deleteButton}
                onClick={onDeleteClicked}
                disabled={selectedTransactionId === null}
                variant={"contained"}
                color={"warning"}
            >
                delete
            </Button>
            <DataGrid
                columns={columns}
                rows={transactions}
                pageSize={20}
                getRowHeight={() => "auto"}
                onSelectionModelChange={onRowSelected}
                getCellClassName={() => styles.tableCell}
            ></DataGrid>
        </Paper>
    )
}

export default TransactionTable;