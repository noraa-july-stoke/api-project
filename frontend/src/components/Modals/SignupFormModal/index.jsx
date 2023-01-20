/* --------------------------------------------------------
Sign Up Form Component
-------------------------------------------------------- */

//Node Library Imports
import React, {useState} from 'react';
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
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <label>
                Email
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                First Name
                <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                Last Name
                <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                Confirm Password
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <button type="submit" className="log-in-button">Sign Up</button>

        </form>
        </>
)};


export default SignupFormModal;
