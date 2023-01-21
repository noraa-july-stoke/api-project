import './ReviewForm.css'

/* --------------------------------------------------------
Add A Spot
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
    // const spotId = 1;

    const dispatch = useDispatch();
    const spot = useSelector(store => store.spots.singleSpot);

    const [comment, setComment] = useState('');
    const [stars, setStars] = useState(1);

    const [errors, setErrors] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const formErrors = [];
        if (!comment) formErrors.push('Review may not be left blank.');
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
        await dispatch(thunkFetchSpotReviews(spot.id));
        history.push(`/spots/${spot.id}`)
    }};

    return (

        <>
            <h1>Add A Review</h1>
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

                <button type='submit' className='add-review-button'>Add Review</button>

            </form>
        </>
    )


}

export default ReviewForm;
