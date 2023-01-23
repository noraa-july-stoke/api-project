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

            <form className='general-form' onSubmit={handleSubmit}>
                <h2>Edit Your Review for {spot.name}</h2>
                <ul className='errors'>
                    {errors.length ? errors.map((error, idx) => <li key={idx}>{error}</li>) : null}
                </ul>

                <div className="form-field-container">
                <label>Stars</label>
                    <input
                        type='number'
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                        required
                        className='add-review-form-data stars-input'
                        max='5'
                        min='1'
                    />
                </div>

                <div className="form-field-container">
                    <label>Leave A Comment</label>
                    <textarea
                        type='text-field'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        required
                        className='add-review-form-data comment-input'
                    />
                </div>


                <button
                    type='submit'
                    className='edit-review-button manage-button'
                    disabled={errors.length > 0}
                >
                    Modify
                </button>
                <div className="nav-links">

                <NavLink className="edit-review-navlink manage-button" exact to={'/'}>
                    <i className="fa-solid fa-house">
                    </i>
                </NavLink>
                <NavLink className="edit-review-navlink manage-button" to={`/spots/${spot.id}`}>
                    <i className="fa-solid fa-circle-left">
                    </i>
                </NavLink>
                </div>


            </form>
        </>
    )


}

export default EditReviewForm;
