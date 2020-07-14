import React from "react";
import { useUserContext } from '../contexts/User';
import { useHistory } from "react-router-dom";

export const Login = () => {
    const { setUser } = useUserContext();
    const history = useHistory();

    const login = async event => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const body = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        const result = await fetch('http://localhost:3004/login_check', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        }).then(response => response.json());

        setUser(result);
        history.push('/orders');
    }

    return (
        <div className="container">
            <h1>Connexion</h1>
            <form id="form" onSubmit={event => login(event)}>
                <label htmlFor="username">Username</label>
                <input name="username" type="text"/>
                <label htmlFor="password">Password</label>
                <input name="password" type="password"/>
                <button className="waves-effect waves-light btn">Connexion</button>
            </form>
        </div>
    )
}