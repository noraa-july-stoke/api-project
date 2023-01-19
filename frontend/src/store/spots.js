/* ----------------------------------------------------------
Spots Reducer File
------------------------------------------------------------*/

//Local Module Imports
import { csrfFetch } from './csrf';
import * as utils from './utils';

//------------------------------------------------------------------------------


/* ----------------------------------------------------------
Action Type Constants
------------------------------------------------------------*/

const SPOTS_FETCH = 'SPOTS_FETCH';
const ADD_SPOT = 'ADD_SPOT';

/* ----------------------------------------------------------
Action creators
------------------------------------------------------------*/

const actionSpotsFetch = (spots) => {
    return {
        type: SPOTS_FETCH,
        spots
    }
};

const actionAddSpot = (spot) => {
    return{
        type: ADD_SPOT,
        spot
    }
}

/* ----------------------------------------------------------
Thunk Actions
------------------------------------------------------------*/


export const thunkSpotsFetch = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots')
    const data = await response.json()

    dispatch(actionSpotsFetch(data.Spots));
};

export const thunkAddSpot = (spot, imgUrl) => async (dispatch) => {
    const response = await csrfFetch('/api/spots/', {
        method: 'POST',
        body: JSON.stringify({...spot})
    });

    const data = await response.json();

    if (response.ok) {
        await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify({url: imgUrl, preview: true})
    })};

    dispatch(actionAddSpot(data.user));
    dispatch(thunkSpotsFetch());
    return response;
};

//Reducer For Spot Fetch Data


const initialState = { allSpots: {}, singleSpot:{} }

const spotsReducer = (state = initialState, action) => {


    //!@#$ - Normalize

    switch (action.type) {

        case(SPOTS_FETCH):
        {
            const newState = { ...state, allSpots: {} };
            newState.allSpots = utils.normalize(action.spots);
            return newState;
        }

        case(ADD_SPOT):
        {
            const newState = { ...state, singleSpot: {} };
            newState.singleSpot = action.spot;
            return newState;
        }

        default:
            return state;
}};


export default spotsReducer;
