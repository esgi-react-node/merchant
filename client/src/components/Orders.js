import React, { useState, useEffect } from "react";
import { useUserContext } from '../contexts/User';

export const Orders = () => {
    const [orders, setOrders] = useState([
        {
            "id": 1,
            "amount": 1300,
            "refund": 0,
            "cart": {
              "banane": 300,
              "tomate": 600
            },
            "status": "created",
            "currency": "EUR",
            "transactionId": null,
            "createdAt": "2020-07-14T11:35:04.793Z",
            "updatedAt": "2020-07-14T11:35:04.793Z",
            "deletedAt": null,
            "UserId": 1,
            "billingId": 1,
            "shippingId": 2,
            "AddressId": null,
            "billing": {
              "id": 1,
              "fullName": "Marcel Patoulachi",
              "address": "place de la tour Eiffel",
              "town": "Paris",
              "zip": "75001",
              "country": "France",
              "createdAt": "2020-07-14T11:35:04.775Z",
              "updatedAt": "2020-07-14T11:35:04.775Z",
              "deletedAt": null,
              "UserId": null
            },
            "shipping": {
              "id": 2,
              "fullName": "Marcel Patoulachi",
              "address": "place de la tour Eiffel",
              "town": "Paris",
              "zip": "75001",
              "country": "France",
              "createdAt": "2020-07-14T11:35:04.790Z",
              "updatedAt": "2020-07-14T11:35:04.790Z",
              "deletedAt": null,
              "UserId": null
            }
          }
    ]);
    const { user } = useUserContext();

    useEffect(() => {
        // async function fetchOrders() {
        //     return await fetch('http://localhost:3004/orders', {
        //         method: 'GET',
        //         headers: {
        //             Authorization: `Bearer ${user.token}`
        //         }
        //     }).then((response) => response.json())
        //     .then(response => response);

        // }
        // setOrders(fetchOrders());
    }, []);

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
                        <tr>
                            <td>{Object.entries(order.cart).map(product => `${product[0]} * ${product[1]}`).join(', ')}</td>
                            <td>{order.amount}</td>
                            <td>{order.status}</td>
                            <td>
                                <span></span>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}