import './EditReviewForm.css'

/* --------------------------------------------------------
Add A Spot

//TODO: Check to see if a user has a review existiing for this spot already,
retrieve it, and make them edit or delete it instead of leaving a new one.
-------------------------------------------------------- */

//Node Library Imports
import React, { useState, useEffect } from 'react';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deNormalize } from '../../../store/utils';

//Local Module Imports
// import * as sessionActions from "../../store/session";
import { thunkEditReview } from '../../../store/reviews';
//Style Imports


//React funcitonal Component that displays controlled inputs for user signup
const EditReviewForm = () => {

    const {reviewId} = useParams();

    const dispatch = useDispatch();
    const spot = useSelector(store => store.spots.singleSpot);
    const reviews = deNormalize(useSelector(store => store.reviews.spot));
    const oldReview = reviews.find(review => +review.id === +reviewId);

    const [comment, setComment] = useState(oldReview.review);
    const [stars, setStars] = useState(+oldReview.stars);

    const [errors, setErrors] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const formErrors = [];
        if (comment.length < 29) formErrors.push('To encourage meaningful reviews, we require they be more than thirty characters');
        if (stars < 1 || stars > 5) formErrors.push('Number of stars must be between one and five!');

        setErrors(formErrors);

    }, [comment, stars]);

    const handleSubmit = async e => {
        e.preventDefault();
        let review;

        if (!errors.length) {
            review = {
                review: comment,
                stars: +stars
            }

            await dispatch(thunkEditReview(review, oldReview.id));
            // await dispatch(thunkFetchSpotReviews(spot.id));
            history.push(`/spots/${spot.id}`)
        }};

    return (

        <>
            <h4>Edit Your Review for {spot.name}</h4>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.length ? errors.map((error, idx) => <li key={idx}>{error}</li>) : null}
                </ul>

                <label>
                    {'Stars '}
                    <input
                        type='number'
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                        required
                        className='add-review-form-data'
                        max='5'
                        min='1'
                    />
                </label>

                <label>
                    {'Leave A Comment '}
                    <input
                        type='text'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        required
                        className='add-review-form-data'
                    />
                </label>

                <button
                    type='submit'
                    className='edit-review-button'
                    disabled={errors.length > 0}
                >
                    Modify
                </button>

                <NavLink className="edit-review-navlink" exact to={'/'}>
                    <i className="fa-solid fa-house">
                    </i>
                </NavLink>
                <NavLink className="edit-review-navlink" to={`/spots/${spot.id}`}>
                    <i className="fa-solid fa-circle-left">
                        {" back"}
                    </i>
                </NavLink>

            </form>
        </>
    )


}

export default EditReviewForm;
