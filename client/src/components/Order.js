import React, { useState } from "react";
import { useUserContext } from '../contexts/User';
import { addOrder } from "../api/orders";
import { useHistory } from "react-router-dom";

export const Order = () => {
    const [cart, setCart] = useState({products: [], total: 0});
    const { user } = useUserContext();
    const history = useHistory();

    const products = [
        {
            "id": 1,
            "label": "Coca",
            "price": 2
        },
        {
            "id": 2,
            "label": "Pâtes",
            "price": 7
        },
        {
            "id": 3,
            "label": "Panna Cotta",
            "price": 4
        }
    ];

    const addProduct = (cart, setCart, product) => {
        const foundProduct = cart.products.find(productCart => productCart.label === product.label)
    
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
        const foundProduct = cart.products.find(productCart => productCart.label === product.label)
        
        if (foundProduct) {
            foundProduct.quantity -= 1
            const newTotal = cart.total - foundProduct.price
            const newCart = cart.products.filter(productCart => productCart.label !== product.label)
            
            if (foundProduct.quantity === 0) {
                setCart({products: newCart, total: newTotal})
            } else {
                setCart({products: [...newCart, foundProduct], total: newTotal})
            }
        }
    }

    const sendTransaction = async (cart) => {
        if (cart.products.length > 0) {
            const order = await addOrder(user, cart);
    
            history.push('/orders');
            const win = window.open(order.checkoutUrl, '_blank');
            win.focus();
        }
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
                            <td>{product.label}</td>
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
                    { cart.products.map(product => (
                        <tr key={product.id}>
                            <td>{product.label}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
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