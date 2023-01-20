import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { thunkSingleSpotFetch } from '../../../store/spots';

import SpotImagesDisplay from '../SpotImagesDisplay/SpotImagesDisplay';


const SingleSpotPage = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkSingleSpotFetch(spotId));
    },[]);

    const spot = useSelector(store => store.spots.singleSpot);

    if (spot) {

        return (

            <div className='single-spot-page-container'>
                <h1>{spot.name}</h1>
                <div className='spot-details-container'>
                    <span className='single-spot-info'>{spot.avgStarRating || 'No Review Data'}</span>
                    <span className='single-spot-info'>{spot.numReviews || 'No Review Data'}</span>
                    <span className='single-spot-info'>{'AwesomeHost'}</span>
                    <span className='single-spot-info'>{spot.city}, {spot.state}, {spot.country}</span>
                    <SpotImagesDisplay images={spot.SpotImages} />

                </div>

            </div>

    )} else return null;

};

export default SingleSpotPage;
