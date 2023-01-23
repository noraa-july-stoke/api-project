import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

import { thunkSingleSpotFetch } from '../../../store/spots';
import SpotImagesDisplay from '../SpotImagesDisplay/SpotImagesDisplay';
import SpotReviewsDisplay from '../../ReviewsDisplayComponents/SpotReviewsDisplay';
import './SingleSpotPage.css';


const SingleSpotPage = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const spot = useSelector(store => store.spots.singleSpot);
    const sessionUser = useSelector(store => store.session.user);


    useEffect(() => {
        dispatch(thunkSingleSpotFetch(spotId));
    },[dispatch, spotId]);

    const handleManageClick = e => {
        history.push(`/spots/${spot.id}/edit`);
    };

    if (spot) {

        return (
            <div className='single-spot-page-container'>
                <div className='spot-name-details'>
                    <span className='spot-name'><h2 className='spot-name'>{spot.name}</h2><div></div></span>
                    <div className='spot-details-container'>
                        <span className='single-spot-info'>
                            {
                            spot.avgStarRating
                                ? <><span className='star-container'>
                                    <i className="fa-solid fa-star"> </i>
                                    </span>{spot.avgStarRating.toFixed(1)} {spot.numReviews + " Reviews • " || 'No Review Data'}</>
                                : false || 'No Review Data'}
                        </span>
                    <span className='single-spot-info'>{'AwesomeHost • '}</span>
                    <span className='single-spot-info'>{" " +spot.city}, {spot.state}, {spot.country}</span>


                </div>
                    <SpotImagesDisplay images={spot.SpotImages} />

                </div>

                {
                    sessionUser && sessionUser.id === spot.ownerId
                        ?
                            <div>
                                <button className='manage-button' onClick={handleManageClick}>Manage this spot</button>
                            </div>

                        : null
                }
                <div className='spot-description'>
                    {spot.description}
                </div>


                <SpotReviewsDisplay />
                </div>

    )} else return null;

};

export default SingleSpotPage;
