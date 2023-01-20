import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul id='navigation-container'>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
                <ProfileButton user={sessionUser} />
            </li>
            {isLoaded && sessionUser && (
                <>
                    <li>
                        <NavLink to={`/spots/${sessionUser.id}/add-spot`}>Add Your Spot!</NavLink>
                    </li>
                </>
            )}
        </ul>
    )
}

export default Navigation;
