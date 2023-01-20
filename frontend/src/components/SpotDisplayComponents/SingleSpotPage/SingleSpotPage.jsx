import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

import { thunkSingleSpotFetch } from '../../../store/spots';
import SpotImagesDisplay from '../SpotImagesDisplay/SpotImagesDisplay';
import SpotReviewsDisplay from '../../ReviewsDisplayComponents/SpotReviewsDisplay';


const SingleSpotPage = () => {
    const { spotId } = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const spot = useSelector(store => store.spots.singleSpot);
    const sessionUser = useSelector(store=> store.session.user);

    useEffect(() => {
        dispatch(thunkSingleSpotFetch(spotId));
    },[dispatch, spotId]);

    const clickHandler = e => {
        history.push(`/spots/${spot.id}/edit`);
    };

    if (spot) {

        return (
            <>
            <div className='single-spot-page-container'>
                <h1>{spot.name}</h1>
                <div className='spot-details-container'>
                    <span className='single-spot-info'>{spot.avgStarRating || 'No Review Data'}</span>
                    <span className='single-spot-info'>{spot.numReviews || 'No Review Data'}</span>
                    <span className='single-spot-info'>{'AwesomeHost'}</span>
                    <span className='single-spot-info'>{spot.city}, {spot.state}, {spot.country}</span>
                    <SpotImagesDisplay images={spot.SpotImages} />

                </div>

                {
                    sessionUser && sessionUser.id === spot.ownerId
                        ?
                            <div>
                                <button onClick={clickHandler}>Manage this spot</button>
                            </div>

                        : null
                }


            </div>
                <SpotReviewsDisplay />
            </>

    )} else return null;

};

export default SingleSpotPage;
