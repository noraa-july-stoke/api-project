import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = e => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunkLogout());
        history.push('/')
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


    return (
        <>
            <button className='profile-menu-icons-button' onClick={openMenu}>
                <i className="fa-solid fa-bars"></i>
                <div className="spacer"></div>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {
                user
                ? (
                    <>
                        <li className='host-spot-link border-bottom'>{user.email}</li>
                        <li>
                            <NavLink to='/your-spots'>Your Spots</NavLink>
                        </li>
                        <li className='border-bottom'>
                            <NavLink className='host-spot-link-dropdown' to='/add-spot'>Host An Adventure</NavLink>
                        </li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                )
                : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />

                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
