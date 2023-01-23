import './ReviewForm.css'

/* --------------------------------------------------------
Add A Spot

//TODO: Check to see if a user has a review existiing for this spot already,
retrieve it, and make them edit or delete it instead of leaving a new one.
-------------------------------------------------------- */

//Node Library Imports
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//Local Module Imports
// import * as sessionActions from "../../store/session";
import { thunkAddReview, thunkFetchSpotReviews } from '../../../store/reviews';

//Style Imports


//React funcitonal Component that displays controlled inputs for user signup
const ReviewForm = () => {

    const dispatch = useDispatch();
    const spot = useSelector(store => store.spots.singleSpot);

    const [comment, setComment] = useState('');
    const [stars, setStars] = useState(1);
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

        await dispatch(thunkAddReview(review, spot.id));
        // await dispatch(thunkFetchSpotReviews(spot.id));
        history.push(`/spots/${spot.id}`)
    }};

    return (

        <>
            <h1>Add A Review</h1>
            <form className='general-form' onSubmit={handleSubmit}>
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
                className='manage-button add-review-button'
                disabled={errors.length > 0}>
                    Add Review
                </button>

            </form>
        </>
    )


}

export default ReviewForm;
