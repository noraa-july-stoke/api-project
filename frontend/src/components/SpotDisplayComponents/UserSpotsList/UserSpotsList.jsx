import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { thunkSpotsFetch } from '../../../store/spots';
import SpotCard from '../SpotCard/SpotCard';
import * as utils from '../../../store/utils';




const UserSpotsList = () => {

    const dispatch = useDispatch();
    const spots = utils.deNormalize(useSelector(store => store.spots.allSpots));
    const user = useSelector(store => store.session.user)
    const userSpots = spots.filter(spot => spot.ownerId === user.id)

    useEffect(() => {
        dispatch(thunkSpotsFetch());

    }, [dispatch]);


    return (

        <>
            <div className='spots-display'>
                {
                    userSpots.length
                        ?
                        <div className='user-spots'>
                            <h1>Click A Spot To Edit</h1>
                            <div className='user-spot-card-display'>
                                {userSpots.map((spot) =>
                                    <SpotCard spot={spot} key={spot.id} />
                                 )}
                            </div>
                        </div>
                        : <><h1>You Don't Have Any Spots!!!</h1></>
                }
            </div>
        </>
    )


}

export default UserSpotsList;
