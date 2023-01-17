import { thunkSpotsFetch } from "../../../store/spots";
import { useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import SpotCard from '../SpotCard';

const SpotsContainer = () => {

    const dispatch = useDispatch();
    const spots = useSelector((store) => store.spots);
    console.log(spots);

    useEffect(() => {
        dispatch(thunkSpotsFetch());

    }, [dispatch])


    if (spots.length){
        return (
            spots.map((spot) => {
                return <SpotCard spot={spot} />;
            }
        ))
    }

    return null;
};





export default SpotsContainer;
