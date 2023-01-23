import './SpotReviewsDisplay.css'
import { thunkFetchSpotReviews } from "../../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';
import * as utils from '../../../store/utils';
import ReviewCard from "../ReviewCard/ReviewCard";


const SpotReviewsDisplay = () => {

    const {spotId} = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const spot = useSelector(store => store.spots.singleSpot)
    const reviewsObj = useSelector(store => store.reviews.spot);
    const sessionUser = useSelector(store => store.session.user);
    const {avgStarRating, numReviews} = useSelector(store => store.spots.singleSpot);
    const reviews = utils.deNormalize(reviewsObj);

    let userReview = reviews.find((review) => review.userId === sessionUser.id);
    // const addReviewClassName = "add-review-button" + (userReview ? " hidden" : "");
    // console.log(addReviewClassName);


    useEffect(() => {
        dispatch(thunkFetchSpotReviews(spotId));

    }, [dispatch, spotId]);

    const reviewButtonText = userReview !== undefined ? "Spot alreaady reviewed" : "Leave Review"

    const handleReviewClick = e => {
        history.push(`/create-review`);
    }
    console.log(sessionUser, spot)



    return (
        <div className="reviews-display">
            <span>{avgStarRating} <span className='star-container'><i className="fa-solid fa-star"></i></span> • {numReviews} reviews </span>
            <div className="review-cards-container">
                {
                    reviews.length
                    ?
                        reviews.map(review => <ReviewCard review={review} sessionUser={sessionUser} key={review.id}/>)
                    :
                    null
                }
            </div>
            {
                sessionUser && sessionUser.id !== spot.ownerId
                    ?
                    <div className="yo">
                        <button
                            onClick={handleReviewClick}
                            disabled={userReview !== undefined}
                        >
                            {reviewButtonText}
                            <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                    </div>
                    : null
            }
        </div>

)};

export default SpotReviewsDisplay;
