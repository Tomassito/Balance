import {Transaction} from "./types";
import {TRANSACTIONS_API_URL} from "./constants";


class TransactionsService {

    public static async addTransaction(data: Omit<Transaction, "date" | "id">) {
        const id = await TransactionsService.getNextTransactionId();
        const date = TransactionsService.getCurrentTimeStringWithoutMS();
        return fetch(TRANSACTIONS_API_URL, {
            method: "POST",
            body: JSON.stringify({...data, id, date}),
            headers: {"Content-Type": "application/json"}
        })
    }

    public static getTransactions() : Promise<Transaction[]> {
        return fetch(TRANSACTIONS_API_URL)
            .then(response => response.json())
    }

    public static deleteTransaction(id: Transaction["id"]) {
        return fetch(`${TRANSACTIONS_API_URL}/${id}`, {
            method: "DELETE"
        })
    }

    private static getCurrentTimeStringWithoutMS() {
        const now = new Date().toISOString();
        return now.slice(0, now.length - 5);
    }

    /*
        This of course is normally handled by db engine
     */
    private static getNextTransactionId() {
        return TransactionsService.getTransactions()
            .then(data => data.reduce((maxId, transaction) => {
                return transaction.id > maxId ? transaction.id : maxId;
            }, 0))
            .then(lastTransactionId => lastTransactionId + 1);
    }
}

export default TransactionsService;