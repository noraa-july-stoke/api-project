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
                <span className='spot-avg-rating'> {spot.avgRating ? <><div className="star-container"><i className="fa-solid fa-star"> </i> </div>{spot.avgRating.toFixed(2)} </> : ""}</span>
            </div>
            <div className='price-per-day'>${spot.price} <span className='night-text'>night</span></div>
        </div>
    );
}

export default SpotCard;
