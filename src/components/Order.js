import React, { useState } from "react";

const CLIENT_ID = 'client-id-0000000001';
const CLIENT_SECRET = 'client-secret-0000000001';

const products = [
    {
        "id": 1,
        "name": "Coca",
        "price": 2
    },
    {
        "id": 2,
        "name": "Pâtes",
        "price": 7
    },
    {
        "id": 3,
        "name": "Panna Cotta",
        "price": 4
    }
]

const addProduct = (cart, setCart, product) => {
    const foundProduct = cart.products.find(productCart => productCart.name === product.name)

    if (foundProduct) {
        foundProduct.quantity += 1
        const newTotal = cart.total + foundProduct.price
        setCart({products: [...cart.products], total: newTotal})
    } else {
        const newTotal = cart.total + product.price
        setCart({products: [...cart.products, {...product, quantity: 1}], total: newTotal})
    }
}

const removeProduct = (cart, setCart, product) => {
    const foundProduct = cart.products.find(productCart => productCart.name === product.name)

    if (foundProduct) {
        foundProduct.quantity -= 1
        const newTotal = cart.total - foundProduct.price
        const newCart = cart.products.filter(productCart => productCart.name !== product.name)
        
        if (foundProduct.quantity === 0) {
            setCart({products: newCart, total: newTotal})
        } else {
            setCart({products: [...newCart, foundProduct], total: newTotal})
        }

    }
}

const sendTransaction = (cart, currency) => {
    fetch('http://api-merchant/transaction', {
        method: "POST",
        headers: {
            Authorization: "Bearer " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
            ContentType: 'application/json'
        },
        body: JSON.stringify({
            "customerId": "1",
            "tag": "orderId: 12341234",
            "cart": cart.products,
            "amount": cart.total * 100,
            "currency": currency,
            "billing": {
              "fullName": "Marcel Patoulachi",
              "address": "place de la tour Eiffel",
              "town": "Paris",
              "zip": "75001",
              "country": "France"
            },
            "shipping": {
              "fullName": "Marcel Patoulachi",
              "address": "place de la tour Eiffel",
              "town": "Paris",
              "zip": "75001",
              "country": "France"
            },
            "merchantId": 1
        })
    })
}

const handleCurrency = (event, setCurrency) => {
    setCurrency(event.currentTarget.value)
}

const Order = () => {
    const [cart, setCart] = useState({products: [], total: 0});
    const [currency, setCurrency] = useState("EUR");
    const currencyIcon = currency === "EUR" ? '€' : '$';
    
    return (
        <div>
            <h1>Commande</h1>

            <select defaultValue="EUR" onChange={(event) => handleCurrency(event, setCurrency)}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price} {currencyIcon}</td>
                            <td>
                                <span style={{cursor: 'pointer'}} onClick={() => addProduct(cart, setCart, product)}>+</span>
                                <span style={{marginLeft: '10px'}}></span>
                                <span style={{cursor: 'pointer'}} onClick={() => removeProduct(cart, setCart, product)}>-</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>Panier</h1>
            <table>
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Prix unitaire</th>
                        <th>Quantité</th>
                        <th>Total produit</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price} {currencyIcon}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price * product.quantity} {currencyIcon}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Total</h2>
            {cart.total} {currencyIcon}

            <button onClick={() => sendTransaction(cart, currency)}>Valider panier</button>
        </div>
    )
}

export default Order;