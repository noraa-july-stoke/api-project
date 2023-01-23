import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { thunkSpotsFetch } from '../../store/spots';
import favicon from './images/favicon.ico';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    return (
        <ul id='navigation-container'>
            <li>
                <NavLink exact to="/" className='nav-link'>
                    <span className='nav-logo-home-container'>
                        <img className='nav-logo' src={favicon} alt="Adventure Beds Logo" />
                        <div className='spacer'></div>
                        <span className='home-logo-text'>AdventureBeds</span>
                    </span>
                </NavLink>
            </li>

            <li className="profile-button-add-spot-link-container">
                <NavLink className='host-spot-link' to='/add-spot'>Host An Adventure</NavLink>
                <div className='spacer'></div>
                <ProfileButton user={sessionUser} />
            </li>
        </ul>
    )
}

export default Navigation;
