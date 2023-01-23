import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../../context/Modal";
import './LoginForm.css';

const LoginFormModal = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.thunkLogin({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
    })};

    const handleDemoClick = e => {
        e.preventDefault();
        setCredential('userOne');
        setPassword('password')
    }

    return (
        <>
        <h2 className='log-in'>Log In</h2>
        <form className='general-form' onSubmit={handleSubmit}>
            <ul className='errors modal-errors'>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>


            <label>Username or Email </label>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    className="login-credential-field"
                />
                <label> Password </label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-credential-field"
                />
            <button type='fill-demo-user' className='manage-button demo-user' onClick={handleDemoClick}>Demo User</button>
            <button type="submit" className="log-in-button manage-button">Log In</button>
        </form>
        </>

)};

export default LoginFormModal;
