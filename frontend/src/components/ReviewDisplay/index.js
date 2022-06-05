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

            {reviewUser && 
            <>
            <div className='user-container'>
                <img className='review-user-pic' src={reviewUser?.picSrc} />
                <p className='review-username'>{reviewUser?.fullName}</p>
           </div>
            <p className='review-rating'>Rating: {review?.rating}/5</p>
            </>
                }

            
            {review &&
                <p className='review-text'>{review.comment}</p>
            }
            {currentUser && reviewUser && currentUser.id === reviewUser.id && <button className='edit-open-button' onClick={()=>setEditFormOpen(!editFormOpen)}>Edit Review</button>}
            {editFormOpen && <ReviewEditForm business={business} review={review} setEditFormOpen={setEditFormOpen} ></ReviewEditForm>} 

        </div>
    )
}

export default ReviewDisplay
