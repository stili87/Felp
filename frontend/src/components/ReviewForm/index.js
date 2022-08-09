import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/review';
import { Rating } from 'react-simple-star-rating';
import './review-form.css'

const ReviewForm = ({ business, setDisplayReview }) => {
    const [rating, setRating] = useState(60)
    const [comment, setComment] = useState('')
    let sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);

    const handleRating = (rate) => {
        setRating(rate)
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newReview = {
            comment,
            userId: sessionUser.id,
            rating: Number(rating)/20,
            businessId: business.id
        }
        
        dispatch(createReview(newReview))
            .then(() => {
                setDisplayReview(false)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

    }

    const handleCancel = e => {
        setDisplayReview(false)
    }


    return (
        <div className='review-form-container'>
            <p className='review-header'>Review {business.title} Here</p>
            <form className='review-form'>
                {errors.length > 0 &&
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                <label>Rating: 1 to 5</label>
                <Rating onClick={handleRating} ratingValue={rating} size={30} />
                <label>Review</label>
                <textarea onChange={e => setComment(e.target.value)} id='comment-input' type='text' placeholder='Your Review Here' value={comment}></textarea>
                <div id='review-button-holder'>
                    <button id='submit-comment-button' onClick={e => handleSubmit(e)}>Submit Review</button>
                    <button id='submit-comment-button' onClick={e => handleCancel(e)}>Cancel</button>
                </div>
            </form>

        </div>
    )

}

export default ReviewForm
