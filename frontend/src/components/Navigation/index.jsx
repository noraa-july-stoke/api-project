import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

const Navigation = ({isLoaded}) => {

    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    let sessionLinks;

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunkLogout());
    };

    user
        ? sessionLinks = (
            <li>
                <ProfileButton user={user} />
            </li>
        )
        : sessionLinks = (
            <li>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
    );

    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
)};


export default Navigation;
