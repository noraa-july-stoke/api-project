import { dateToParts } from "../../../store/utils";
import { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkDeleteReview, thunkFetchSpotReviews } from "../../../store/reviews";


import './ReviewCard.css'
const ReviewCard = ({review, sessionUser}) => {

    const {spotId} = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const [day, month, year] = dateToParts(review.createdAt);

    const handleDeleteClick = async e => {
        await dispatch(thunkDeleteReview(review.id));
        // await dispatch(thunkFetchSpotReviews(spotId));
        history.push(`/spots/${spotId}`)
    }

    const handleEditClick = e => {
        history.push(`/reviews/${review.id}/edit`);
    }

    return (
        <div className="review-card-container">
            <div className='user-date-pic-container'>
                <img className='profile-pic' src="https://cdn.vectorstock.com/i/preview-1x/01/74/smiling-woman-face-female-avatar-happy-character-vector-42000174.jpg" alt="" />
                <div className ='name-year-container'>
                    <h4>{review.User.firstName}</h4>
                    <span>{month} {year}</span>
                </div>
                {
                    sessionUser.id === review.userId

                    ?
                    <span className='review-session-user-buttons'>
                        <button onClick={handleDeleteClick} className='delete-review-button'>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                        <button onClick={handleEditClick} className='delete-review-button'>
                            <i className="fa-solid fa-pen-fancy"></i>
                        </button>
                    </span>
                    :
                        null
                }

            </div>
            <p className = 'review'>{review.review}</p>

        </div>

)};

export default ReviewCard;
