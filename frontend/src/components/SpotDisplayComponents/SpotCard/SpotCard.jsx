import './SpotCard.css';
const SpotCard = ({spot}) => {

    return (
        <div className='spot-card-container'>
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
