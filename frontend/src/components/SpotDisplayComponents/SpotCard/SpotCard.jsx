import './SpotCard.css';
import { useHistory } from 'react-router';
import {useDispatch} from 'react-redux'

const SpotCard = ({spot}) => {
    const dispatch = useDispatch()
    const history = useHistory();

    const clickHandler = e => {
        history.push(`/spots/${spot.id}`)
    };

    return (
        <div className='spot-card-container' onClick={clickHandler}>
            <img src={spot.previewImage} alt="a house" className='spot-card-image' />
            <div className='spot-city-state-rating'>
                <span className='spot-city-state'>{spot.city}, {spot.state}</span>
                <span className='spot-avg-rating'>{spot.avgRating ? spot.avgRating : 'no data!'}</span>
            </div>
            <div>${spot.price} night</div>
        </div>
    );
}

export default SpotCard;
