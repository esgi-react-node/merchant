import React, { useState } from "react";
import { useUserContext } from '../contexts/User';

export const Order = () => {
    const [cart, setCart] = useState({products: {}, total: 0});
    const{ user } = useUserContext();

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
    ];

    const addProduct = (cart, setCart, product) => {
        setCart({
            products: {
                ...cart.products,
                [product.name]: (cart.products[product.name] ?? 0) + 1
            },
            total: cart.total + product.price
        });
    }
    
    const removeProduct = (cart, setCart, product) => {
        if (!cart[product.name] || cart[product.name] - 1 === 0) {
            const filteredObject = Object.entries(cart.products).filter(([property, value]) => {
                return property !== product.name;
            });
        
            setCart({
                products: Object.fromEntries(filteredObject),
                total: cart.total - product.price
            })
        } else {
            setCart({
                products: {
                    ...cart.products,
                    [product.name]: cart[product.name] - 1
                },
                total: cart.total - product.price
            });
        }
    }

    const getProductPrice = (product) => {
        const foundProduct = products.find(prod => prod.name === product[0]);
        return foundProduct.price;
    }
    
    const sendTransaction = (cart) => {
        fetch('http://localhost:3004/orders', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                ContentType: 'application/json'
            },
            body: JSON.stringify({
                amount: cart.total,
                currency: "EUR",
                cart: cart.products,
                billing: {
                    "fullName": "Marcel Patoulachi",
                    "address": "place de la tour Eiffel",
                    "town": "Paris",
                    "zip": "75001",
                    "country": "France"
                },
                shipping: {
                    "fullName": "Marcel Patoulachi",
                    "address": "place de la tour Eiffel",
                    "town": "Paris",
                    "zip": "75001",
                    "country": "France"
                }
            })
        })
    }
    
    return (
        <div className="container">
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
                            <td>{product.price} €</td>
                            <td>
                                <span className="material-icons green-text" style={{cursor: 'pointer'}} onClick={() => addProduct(cart, setCart, product)}>add</span>
                                <span className="material-icons red-text" style={{cursor: 'pointer', marginLeft: '10px'}} onClick={() => removeProduct(cart, setCart, product)}>remove</span>
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
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                    </tr>
                </thead>
                <tbody>
                    { Object.entries(cart.products).map((product, index) => (
                        <tr key={index}>
                            <td>{product[0]}</td>
                            <td>{product[1]}</td>
                            <td>{getProductPrice(product)} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Total</h2>
            {cart.total} €

            <div className="row">
                <button className="waves-effect waves-light btn" onClick={() => sendTransaction(cart)}>Valider panier</button>
            </div>
        </div>
    )
}