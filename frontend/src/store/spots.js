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
const GET_SPOT = 'GET_SPOT';

/* ----------------------------------------------------------
Action creators
------------------------------------------------------------*/

//Gets a list of spots from the database
const actionSpotsFetch = (spots) => {
    return {
        type: SPOTS_FETCH,
        spots
}};

//Adds a new spot into All spots.
const actionAddSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
}};

//Gets details for single spot
const actionGetSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
}};




/* ----------------------------------------------------------
Thunk Actions
------------------------------------------------------------*/


export const thunkSpotsFetch = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots')
    const data = await response.json()

    dispatch(actionSpotsFetch(data.Spots));
    return data;
};


export const thunkAddSpot = (spot, imgUrl) => async (dispatch) => {

    const response = await csrfFetch('/api/spots/', {
        method: 'POST',
        body: JSON.stringify({...spot})
    });

    if (response.ok) {
        const data = await response.json();
        const imgRes = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify({url: imgUrl, preview: true})
        });

        if (imgRes.ok) {
            const imgData = await imgRes.json();
            data.previewImage = imgData.url;
            dispatch(actionAddSpot(data));
            return data;
}}};


export const thunkSingleSpotFetch = (spotId) => async (dispatch) => {
    const singleSpotRes = await csrfFetch(`/api/spots/${spotId}`);
    if (singleSpotRes.ok){
        const spot = await singleSpotRes.json();
        dispatch(actionGetSpot(spot))
        return spot;
}};

export const thunkEditSpot = (spot) => async (dispatch) => {
    const editSpotRes = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price
    })});
    if (editSpotRes.ok) {
        const spotData = await editSpotRes.json();
        dispatch(actionSpotsFetch);
        return spotData;
}};


export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        return data;
}};




//Reducer For Spot Fetch Data

const initialState = { allSpots: {}, singleSpot:{} }

const spotsReducer = (state = initialState, action) => {


    // !@#$ - Normalize || state must persist. any time single spot or all, the keys should be the same
    switch (action.type) {

        case(SPOTS_FETCH):

        {
            const newState = initialState;
            newState.allSpots = utils.normalize(action.spots);
            return newState;
        }

        case(ADD_SPOT):

        {
            const newState = { ...state};
            newState.allSpots = { ...newState.allSpots, [action.spot.id]:action.spot}
            return newState;
        }

        case(GET_SPOT):
        {
            const newState = {...state};
            newState.singleSpot = action.spot;
            return newState;

        }

        default:
            return state;
}};


export default spotsReducer;
