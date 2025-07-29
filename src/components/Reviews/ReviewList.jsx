import ReviewCard from './ReviewCard';

const ReviewList = ({ reviews, user, editReview, setEditReview, editingId, setEditingId, handleEditReview, handleDeleteReview }) => {
    return (
        <div>
            {reviews.map((review) => (
                <ReviewCard 
                key={review.id} 
                review={review} 
                user={user}
                isEditing = {editingId === review.id}
                editReview={editReview}
                setEditReview={setEditReview}
                onEditClick = {() => {
                    setEditingId(review.id);
                    setEditReview({
                        ratings: review.ratings,
                        comment: review.comment,
                    });
                }} 
                onCancelEdit = {() => {
                    setEditingId(null);
                }}
                onSaveEdit={handleEditReview}
                onDelete = {() => handleDeleteReview(review.id)}
                />
            ))}
            
        </div>
    );
};

export default ReviewList;