import { thunkSpotsFetch } from "../../../store/spots";
import { useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

const SpotsContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(thunkSpotsFetch());

    }, [dispatch])


}

export default SpotsContainer;
