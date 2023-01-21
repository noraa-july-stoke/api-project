import { thunkFetchSpotReviews } from "../../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react';
import { useParams } from "react-router";
import * as utils from '../../../store/utils';
import ReviewCard from "../ReviewCard/ReviewCard";


const SpotReviewsDisplay = () => {
    const {spotId} = useParams();

    const dispatch = useDispatch();
    const reviewsObj = useSelector(store => store.reviews.spot);
    const {avgStarRating, numReviews} = useSelector(store => store.spots.singleSpot);
    const reviews = utils.deNormalize(reviewsObj);

    useEffect(() => {

        dispatch(thunkFetchSpotReviews(spotId));

    }, [dispatch, spotId]);


    if (reviews.length) {

    return (
        <div className="reviews-display">
            <h3>{avgStarRating} stars • {numReviews} reviews </h3>
            <div className="review-cards-container">
                {reviews.map(review => <ReviewCard review={review} key={review.id}/>)}
            </div>
        </div>
    )} else return null

}

export default SpotReviewsDisplay;
