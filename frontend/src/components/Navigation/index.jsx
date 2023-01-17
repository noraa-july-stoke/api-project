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
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;

















//________________________________________________________
//________________________________________________________
//________________________________________________________
//________________________________________________________




// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import './Navigation.css';

// const Navigation = ({isLoaded}) => {

//     const user = useSelector((state) => state.session.user);
//     let sessionLinks;

//     user
//         ? sessionLinks = (
//             <li>
//                 <ProfileButton user={user} />
//             </li>
//         )
//         : sessionLinks = (
//             <li>
//                 <OpenModalButton
//                     buttonText="Log In"
//                     modalComponent={<LoginFormModal />}
//                 />
//                 <OpenModalButton
//                     buttonText="Sign Up"
//                     modalComponent={<SignupFormModal />}
//                 />
//             </li>
//     );

//     return (
//         <ul id='navigation-container'>
//             <li>
//                 <NavLink exact to="/">Home</NavLink>
//             </li>
//             {isLoaded && sessionLinks}
//         </ul>
// )};


// export default Navigation;
