import { useState } from 'react';
import { useSelector } from 'react-redux';
import './review-form.css'

const ReviewForm = ({business, setDisplayReview}) => {
const [rating, setRating] = useState('')
const [comment, setComment] = useState('')
let sessionUser = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleCancel = e => {
        setDisplayReview(false)
    }
    const handleSetRating = e => {
        if(e.target.value > 0 && e.target.value <= 5){
            setRating(e.target.value)
        }else{
            setRating('')
        }
    }

    return (
        <div className='review-form-container'>
                <p className='review-header'>Review {business.title} Here</p>
                <form className='review-form'>
                    <label>Rating: 1 to 5</label>
                    <input onChange={e=> handleSetRating(e)} id='rating-input' type='text' placeholder='1 to 5' value={rating}></input>
                    <label>Comment</label>
                    <textarea onChange={e => setComment(e.target.value)} id='comment-input' type='text' placeholder='Your Comment Here' value={comment}></textarea>
                    <button id='submit-comment-button' onClick={e=>handleSubmit(e)}>Submit Comment</button>
                    <button id='submit-comment-button' onClick={e=>handleCancel(e)}>Cancel</button>
                </form>

        </div>
    )

}

export default ReviewForm
