import React from "react";
import { useHistory } from "react-router-dom";

export const ValidatedOrder = () => {
    const history = useHistory();

    return (
        <div className="container">
            Félicitations! Votre commande a bien été validée.

            <button className="waves-effect waves-light btn" onClick={() => history.push('/orders')}>Retour aux transactions</button>
        </div>
    )
}