/* --------------------------------------------------------
Sign Up Form Component
-------------------------------------------------------- */

//Node Library Imports
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

//Local Module Imports
import * as sessionActions from "../../store/session";

//Style Imports
import './SignupForm.css';


//React funcitonal Component that displays controlled inputs for user signup
const SignupFormPage = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([]);


    if (sessionUser) return <Redirect to={"/"} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword ) {
            setErrors([]);
            return dispatch(sessionActions.thunkSignup({ email, username, firstName, lastName, password }))
                .catch(async (res) => {
                    const data=await res.json();
                    if (data && data.errors) setErrors(data.errors);
        })}
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (

        <form onSubmit={handleSubmit}>
            Sign Up

            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <label>
                Email
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                First Name
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                Last Name
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <label>
                Confirm Password
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="signup-form-data"
                />
            </label>

            <button type="submit" className="log-in-button">Sign Up</button>

        </form>
)}


export default SignupFormPage;
