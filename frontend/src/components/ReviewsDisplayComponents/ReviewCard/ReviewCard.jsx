const ReviewCard = ({review}) => {
    console.log(review);
    return (
        <div className="review-card-container">
            <div>
                <h4>{review.User.firstName} Says:</h4>
                <span>{review.review}</span>
            </div>

        </div>

)};

export default ReviewCard;
