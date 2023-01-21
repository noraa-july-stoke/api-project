import { csrfFetch } from './csrf';
import * as utils from './utils';

const FETCH_SPOT_REVIEWS = 'FETCH_SPOT_REVIEWS';
const FETCH_USER_REVIEWS = 'FETCH_USER_REVIEWS';
const DELETE_REVIEW = 'DELETE_REVIEW';
const ADD_REVIEW = 'ADD_REVIEW';

const actionFetchSpotReviews = (reviews) => {
    return {
        type: FETCH_SPOT_REVIEWS,
        reviews
}};

const actionFetchUserReviews = (userId) => {
    return {
        type: FETCH_USER_REVIEWS,
        userId
}};

const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
}};

const actionAddReview = () => {
    return {
        type: ADD_REVIEW,

    }
}

export const thunkFetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    let data;
    if (response.ok) {
    data = await response.json();
    dispatch(actionFetchSpotReviews(data.Reviews));
}};


export const thunkAddReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review: review.review,
            stars: review.stars
    })});
    let data;

    if (response.ok) {
        data = await response.json();
        dispatch(actionFetchSpotReviews);
        // dispatch(actionFetchUserReviews);
        return data;
    }}

export const thunkDeleteReveiw = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${reviewId}/`, {
        method: 'DELETE'
    });
    let data;
    if (response.ok) {
        data = await response.json();

    }
}

// -------------------------------------------------------
// Reviews Reducer
// -------------------------------------------------------

const initialState = { spot: {}, user: {} }
const reviewsReducer = (state = initialState, action) => {

    // !@#$ - Normalize || state must persist. any time single spot or all, the keys should be the same
    switch (action.type) {

        case (FETCH_SPOT_REVIEWS):

            {
                const newState = { spot: {}, user: {} };
                newState.spot = utils.normalize(action.reviews);
                return newState;
            }

            case(ADD_REVIEW):
            {
                // const newState = { ...state };
                // newState.allSpots = { ...newState.allSpots, [action.spot.id]: action.spot }
                // return newState;
            }

        default:
            return state;
    }
};

export default reviewsReducer;
