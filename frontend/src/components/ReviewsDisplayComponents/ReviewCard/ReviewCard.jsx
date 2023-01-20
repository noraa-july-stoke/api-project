import { dateToParts } from "../../../store/utils";




import './ReviewCard.css'
const ReviewCard = ({review}) => {

    const [day, month, year] = dateToParts(review.createdAt);
    console.log(month,year)

    return (
        <div className="review-card-container">
            <div className='user-date-pic-container'>
                <img className='profile-pic' src="https://cdn.vectorstock.com/i/preview-1x/01/74/smiling-woman-face-female-avatar-happy-character-vector-42000174.jpg" alt="" />
                <div className ='name-year-container'>
                    <h4>{review.User.firstName}</h4>
                    <span>{month} {year}</span>
                </div>
            </div>
            <p className = 'review'>{review.review}</p>

        </div>

)};

export default ReviewCard;
