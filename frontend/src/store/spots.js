/* ----------------------------------------------------------
Spots Reducer File
------------------------------------------------------------*/

//Local Module Imports
import { csrfFetch } from './csrf';

//------------------------------------------------------------------------------


/* ----------------------------------------------------------
Action Type Constants
------------------------------------------------------------*/

const SPOTS_FETCH = 'SPOTS_FETCH';

/* ----------------------------------------------------------
Action creators
------------------------------------------------------------*/

export const actionSpotsFetch = (spots) => {
    return {
        type: SPOTS_FETCH,
        spots
    }
};

/* ----------------------------------------------------------
Thunk Actions
------------------------------------------------------------*/


export const thunkSpotsFetch = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots');

    const data = await response.json();
    dispatch(actionSpotsFetch(data.Spots));
};



//Reducer For Spot Fetch Data

const initialState = { spots: null }

const spotsReducer = (state = initialState, action) => {

    let newState = Object.assign({}, state);

    switch (action.type) {

        case(SPOTS_FETCH):
            console.log(action.spots)
            newState.spots = action.spots;
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
