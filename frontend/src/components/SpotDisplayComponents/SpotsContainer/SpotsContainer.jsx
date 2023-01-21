import { thunkSpotsFetch } from "../../../store/spots";
import { useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import SpotCard from '../SpotCard/SpotCard';
import './SpotsContainer.css'
import * as utils from '../../../store/utils';

const SpotsContainer = () => {

    const dispatch = useDispatch();
    const spots = utils.deNormalize(useSelector((store) => store.spots.allSpots));

    useEffect(() => {
        dispatch(thunkSpotsFetch());

    }, [dispatch]);

    return (

        <>
        <div className='spots-display'>
            {
                spots.length
                ? spots.map((spot) => <SpotCard spot={spot} key={spot.id} />)
                : null
            }
        </div>
        </>

    );

};





export default SpotsContainer;
