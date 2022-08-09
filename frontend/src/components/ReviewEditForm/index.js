import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReview, deleteReview } from '../../store/review';
import { Rating } from 'react-simple-star-rating';
import './review-form.css'

const ReviewForm = ({ business, review, setEditFormOpen }) => {
    const [rating, setRating] = useState(review?.rating*20 || 20)
    const [comment, setComment] = useState(review?.comment)
    let sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const newReview = {
            reviewId: review.id,
            comment,
            userId: sessionUser.id,
            rating: Number(rating)/20,
            businessId: business.id
        }
        dispatch(editReview(newReview))
            .then(() => {
                setEditFormOpen(false)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    const handleDelete = e => {
        e.preventDefault()

        dispatch(deleteReview(review.id))
            .then(() => {
                setEditFormOpen(false)
            })
    }

    const handleCancel = e => {
        setEditFormOpen(false)
    }

    const handleRating = (rate) => {
        setRating(rate)
      }

    return (
        <div className='review-form-container'>
            <p className='review-header'>Edit Your Review of {business.title}</p>
            <form className='review-form'>
                {errors.length > 0 &&
                <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    }
                <label>Rating: 1 to 5</label>
                <Rating onClick={handleRating} ratingValue={rating} size={30} initialValue={rating}/>
                <label>Review</label>
                <textarea onChange={e => setComment(e.target.value)} id='comment-input' type='text' placeholder='Your Review Here' value={comment}></textarea>
                <div id='review-button-holder'>
                    <button id='submit-comment-button' onClick={e => handleSubmit(e)}>Submit Edited Review</button>
                    <button id='submit-comment-button' onClick={e => handleDelete(e)}>Delete Review</button>
                    <button id='submit-comment-button' onClick={e => handleCancel(e)}>Cancel</button>
                </div>
            </form>

        </div>
    )

}

export default ReviewForm
