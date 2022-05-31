import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/review';
import './review-form.css'

const ReviewForm = ({ business, setDisplayReview }) => {
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')
    let sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newReview = {
            comment,
            userId: sessionUser.id,
            rating: Number(rating),
            businessId: business.id
        }
        console.log(newReview)

        dispatch(createReview(newReview))
        setDisplayReview(false)

    }

    const handleCancel = e => {
        setDisplayReview(false)
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
                <label>Rating: 1 to 5</label>
                <input onChange={e => handleSetRating(e)} id='rating-input' type='text' placeholder='1 to 5' value={rating}></input>
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
