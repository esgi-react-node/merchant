import React, { useState, useEffect } from "react";
import { useUserContext } from '../contexts/User';
import { getOrders, refundOrder, partialRefundOrder } from '../api/orders';

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        getOrders(user, setOrders);
    }, [user]);

    const cancelOrder = async (order, orders, setOrders) => {
        if (order.status !== 'confirmed') {
            return;
        }

        let canceledOrder = {};
        const amount = document.getElementById(`amount-${order.id}`).value;
        if (amount !== '' && amount > ((order.amount - order.refund) / 100)) {
            return;
        }

        if (amount !== '') {
            canceledOrder = await partialRefundOrder(user, order, amount);
            if (canceledOrder.hasOwnProperty('TransactionId')) {
                const newOrders = orders.filter(order => canceledOrder.TransactionId !== order.transactionId);
                const newOrder = orders.filter(order => canceledOrder.TransactionId === order.transactionId);
                newOrder[0].amount = (order.amount - (amount * 100));

                setOrders([...newOrders, ...newOrder]);
            }
        } else {
            canceledOrder = await refundOrder(user, order);
            if (canceledOrder.hasOwnProperty('TransactionId')) {
                const newOrders = orders.filter(order => canceledOrder.TransactionId !== order.transactionId);
                const newOrder = orders.filter(order => canceledOrder.TransactionId === order.transactionId);
                newOrder[0].status = 'refund';
                setOrders([...newOrders, ...newOrder]);
            }
        }


    }

    console.log(orders);
    return (
        <div className="container">
            <h1>Transactions</h1>

            <table>
                <thead>
                    <tr>
                        <th>Commande</th>
                        <th>Total</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.cart.map(product => `${product.label} * ${product.quantity}`).join(', ')}</td>
                            <td>{(order.amount - order.refund) / 100} €</td>
                            <td>{order.status}</td>
                            <td>
                                <div className="input-field inline">
                                    <input id={`amount-${order.id}`} type="number"/>
                                    <label htmlFor="amount">Amount</label>
                                </div>
                                <span className="material-icons red-text" style={{cursor: 'pointer'}} onClick={() => cancelOrder(order, orders, setOrders)}>delete</span>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}