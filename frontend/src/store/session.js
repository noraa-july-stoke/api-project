/* ----------------------------------------------------------
Session Reducer File
------------------------------------------------------------*/

//Local Module Imports
import { csrfFetch } from './csrf';

//------------------------------------------------------------------------------


/* ----------------------------------------------------------
Action Type Constants
------------------------------------------------------------*/


const LOGIN = 'session/actionLogin';
const LOGOUT = 'session/actionLogout';
const SIGNUP = 'SIGNUP';
//------------------------------------------------------------------------------


/* ----------------------------------------------------------
Action creators
------------------------------------------------------------*/


//Login
const actionLogin = (user) => {
    return {
        type: LOGIN,
        payload: user
}};
//------------------------------------------------------------------------------


//Logout
const actionLogout = () => {
    return {
        type: LOGOUT
}};
//------------------------------------------------------------------------------


//Probably not needed
// const actionSignup = (user) => {
//     return {
//         type: SIGNUP,
//         payload: user
// }};

/* ----------------------------------------------------------
Thunk Action Creators
------------------------------------------------------------*/


export const thunkSignup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(actionLogin(data.user));
    return response;
};
//------------------------------------------------------------------------------


export const thunkLogin = (user) => async (dispatch) => {

    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        })
    });

    const data = await response.json();
    dispatch(actionLogin(data.user));
    return response;
};
//------------------------------------------------------------------------------



export const thunkRestoreUser = () => async (dispatch) => {

    //Method & body aren't required with a 'GET' fetch;
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(actionLogin(data.user));
    return response;
};
//------------------------------------------------------------------------------


export const thunkLogout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {method: 'DELETE'});
    const data = await response.json();
    dispatch(actionLogout())
    return response;
};
//------------------------------------------------------------------------------


//Reducer For Session Activities. (login, logout, check current user/login status)
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {

    let newState = Object.assign({}, state);

    switch(action.type) {

        case LOGIN:
            newState.user = action.payload;
            return newState;

        case LOGOUT:
            newState.user = null;
            return newState;

        default:
            return state;

}};


export default sessionReducer;
