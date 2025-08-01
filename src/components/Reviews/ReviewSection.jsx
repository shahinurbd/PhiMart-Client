import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";
import authApiClient from "../../services/auth-api-client";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";

const ReviewSection = () => {
    const {productId} = useParams();
    const [canUserReview, setCanUserReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const {user} = useAuthContext();
    const [editReview, setEditReview] = useState({ratings: 0, comment: ""});
    const [editingId, setEditingId] = useState(null);


    const fetchReview = async() => {
      setLoading(true)
        try {
            const res = await apiClient.get(`/products/${productId}/reviews/`);
            setReviews(res.data);
        } catch (error) {
            console.log(error);
        } finally{
          setLoading(false);
        }
    }

    const onSubmit = async(data) => {
        try {
            await authApiClient.post(`/products/${productId}/reviews/`, data);
            fetchReview();
        } catch (error) {
            console.log(error);
        }
    };

    const checkUserPermission = async() => {
        try {
            const res = await authApiClient.get(`/orders/has-ordered/${productId}/`);
            setCanUserReview(res.data.hasOrdered);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditReview = async(reviewId) => {
      try {
        await authApiClient.put(`/products/${productId}/reviews/${reviewId}/`, editReview);
        setEditingId(null);
        fetchReview();
      } catch (error) {
        console.log(error);
      }
    }

    const handleDeleteReview = async(reviewId) => {
      try {
        await authApiClient.delete(`/products/${productId}/reviews/${reviewId}/`);
        fetchReview();
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        checkUserPermission();
        fetchReview();
    }, []);

    return (
        <div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="badge badge-lg">
        {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </div>
      </div>

      {canUserReview && (
        <div className="card bg-base-100 shadow-lg border border-base-200 rounded-xl overflow-hidden">
          <div className="card-body">
            <h3 className="card-title text-lg">Write a Review</h3>
            <ReviewForm onSubmit={onSubmit} />
          </div>
        </div>
      )}

      <div className="divider"></div>

        {isLoading ? (
          <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
        ) : reviews.length === 0 ? (
            <div className="text-center py-8">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
            <p className="text-base-content/70">
              Be the first to review this product!
            </p>
            </div>
        ) : (
          <ReviewList 
          reviews={reviews} 
          user={user} 
          editReview={editReview}
          setEditReview={setEditReview}
          editingId={editingId}
          setEditingId={setEditingId}
          handleEditReview={handleEditReview} 
          handleDeleteReview = {handleDeleteReview}
          />
        )}
      
    </div>
  );
};

export default ReviewSection;