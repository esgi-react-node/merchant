import React from "react";
import { useUserContext } from '../contexts/User';

export const Login = () => {
    const { user, setUser } = useUserContext();

    const login = async event => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const result = await fetch('http://localhost:3004/login_check', {
            method: 'POST',
            body: JSON.stringify({username: formData.get('username'), password: formData.get('password')})
        }).then(response => response.json());
        console.log(result);
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