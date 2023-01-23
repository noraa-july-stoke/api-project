/* --------------------------------------------------------
Sign Up Form Component
-------------------------------------------------------- */

//Node Library Imports
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';

//Local Module Imports
import { useModal } from '../../../context/Modal';
import * as sessionActions from "../../../store/session";

//Style Imports
import './SignupForm.css';


//React funcitonal Component that displays controlled inputs for user signup
const SignupFormModal = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal();

    useEffect(() => {
        const newErrors = [];
        if (!username || !firstName || !lastName || !email || ! password || ! confirmPassword) newErrors.push("All fields in this form are required!");
        if (password !== confirmPassword) newErrors.push('Passwords must match!');
        setErrors(newErrors);
    }, [username, firstName, lastName, email, password, confirmPassword])

    const handleSubmit = e => {
        e.preventDefault();
        if (password === confirmPassword ) {
            setErrors([]);
            return dispatch(sessionActions.thunkSignup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors)  setErrors(data.errors);
        })};
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
        <h2 className='sign-up'>Sign Up</h2>
        <form onSubmit={handleSubmit} className='general-form signup-form'>
            <ul className='errors'>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

                <div className="form-field-container">
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="signup-form-data"
                />
                </div>

                <div className="form-field-container">
                    <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    className="signup-form-data"
                />
                </div>

            <div className="form-field-container">

            <label>First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    className="signup-form-data"
                />
                </div>

                <div className="form-field-container">
                <label>Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    className="signup-form-data"
                />
                </div>

                <div className="form-field-container">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="signup-form-data"
                />
                </div>
            <div className="form-field-container">
                <label> Confirm Password</label>

                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    className="signup-form-data"
                />
                </div>


            <button type="submit" className="log-in-button manage-button" disabled ={errors.length > 0}>Sign Up</button>

        </form>
        </>
)};


export default SignupFormModal;
