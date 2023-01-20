import { csrfFetch } from './csrf';
import * as utils from './utils';

const FETCH_SPOT_REVIEWS = 'FETCH_SPOT_REVIEWS';
const FETCH_USER_REVIEWS = 'FETCH_USER_REVIEWS';
const DELETE_REVIEW = 'DELETE_REVIEW';

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

export const thunkFetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(actionFetchSpotReviews(data.Reviews));
};

// -------------------------------------------------------
// Reviews Reducer
// -------------------------------------------------------

const initialState = { spot: {}, user: {} }
const reviewsReducer = (state = initialState, action) => {


    // !@#$ - Normalize || state must persist. any time single spot or all, the keys should be the same
    switch (action.type) {

        case (FETCH_SPOT_REVIEWS):

            {
                const newState = { ...state };
                newState.spot = utils.normalize(action.reviews);
                return newState;
            }

        default:
            return state;
    }
};

export default reviewsReducer;
