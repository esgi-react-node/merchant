import React, { useState } from "react";

const getTransactions = () => {
    return fetch('http://api-merchant/transactions', {
        method: 'GET',
        headers: {
            Authorization: "Bearer "
        }
    }).then((response) => response.json())
    .then(response => response);
}

const Transaction = () => {
    const [transactions, setTransactions] = useState(getTransactions);

    return (
        <div>
            <h1>Transactions</h1>
        </div>
    )
}

export default Transaction;