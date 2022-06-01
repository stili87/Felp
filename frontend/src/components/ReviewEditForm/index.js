import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editReview } from '../../store/review';
import './review-form.css'

const ReviewForm = ({ business, review, setEditFormOpen }) => {
    const [rating, setRating] = useState(review.rating)
    const [comment, setComment] = useState(review.comment)
    let sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newReview = {
            reviewId: review.id,
            comment,
            userId: sessionUser.id,
            rating: Number(rating),
            businessId: business.id
        }
        
        dispatch(editReview(newReview))
            .then(() => {
                setEditFormOpen(false)
                // history.push(`/${business.id}`)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

    }

    const handleCancel = e => {
        setEditFormOpen(false)
    }
    const handleSetRating = e => {
        if (e.target.value > 0 && e.target.value <= 5) {
            setRating(e.target.value)
        } else {
            setRating('')
        }
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
                <input onChange={e => handleSetRating(e)} id='rating-input' type='text' placeholder='1 to 5' value={rating}></input>
                <label>Review</label>
                <textarea onChange={e => setComment(e.target.value)} id='comment-input' type='text' placeholder='Your Review Here' value={comment}></textarea>
                <div id='review-button-holder'>
                    <button id='submit-comment-button' onClick={e => handleSubmit(e)}>Submit Edited Review</button>
                    <button id='submit-comment-button' onClick={e => handleCancel(e)}>Cancel</button>
                </div>
            </form>

        </div>
    )

}

export default ReviewForm
