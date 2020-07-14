import React from "react";
import { useHistory } from "react-router-dom";

export const CanceledOrder = () => {
    const history = useHistory();

    return (
        <div className="container">
            Votre commande a bien été annulée. Pas d'inquiètude vous ne serez pas débité.

            <button className="waves-effect waves-light btn" onClick={() => history.push('/orders')}>Retour aux transactions</button>
        </div>
    )
}