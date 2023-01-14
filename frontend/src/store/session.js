import { csrfFetch }from './csrf';

const LOGIN = 'session/actionLogin';
const LOGOUT = 'session/actionLogout';


const actionLogin = (user) => {
    return {
        type: LOGIN,
        payload: user
}};

const actionLogout = () => {
    return {
        type: LOGOUT
}};

export const thunkLogin = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(actionLogin(data.user));
    return response;
};

const initialState = { user: null }

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
