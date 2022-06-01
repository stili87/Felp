import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './review-display.css'
import ReviewEditForm from '../ReviewEditForm/index'

const ReviewDisplay = ({ review, business }) => {
    const allUsers = useSelector(state => state.users)
    const reviewUser = allUsers[review.userId]
    const currentUser = useSelector(state => state.session.user)
    const [editFormOpen, setEditFormOpen] = useState(false)

    useEffect(()=> {},[review])

    return (
        <div className='review-container'>
            {reviewUser && <p className='review-username'>{reviewUser.fullName}</p>}
            {review &&
                <>
                    <p className='review-rating'>Rating: {review.rating}/5</p>
                    <p className='review-text'>Review: {review.comment}</p>
                </>
            }
            {currentUser && reviewUser && currentUser.id === reviewUser.id && <button className='edit-open-button' onClick={()=>setEditFormOpen(!editFormOpen)}>Edit Review</button>}
            {editFormOpen && <ReviewEditForm business={business} review={review} setEditFormOpen={setEditFormOpen} ></ReviewEditForm>} 

        </div>
    )
}

export default ReviewDisplay
