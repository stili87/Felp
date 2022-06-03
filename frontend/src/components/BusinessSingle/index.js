import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import './business-single.css'
import ReviewForm from '../ReviewForm'
import ReviewDisplay from '../ReviewDisplay'
import Likes from '../LikeBusiness'
import { getBusinessReviews } from '../../store/review'
import { getAllUsers } from '../../store/users'



const BusinessSingle = () => {
    const businessId = useParams().businessId
    const business = useSelector(state => state.businesses)[businessId]
    const allTags = useSelector(state => state.tags)
    let sessionUser = useSelector(state => state.session.user);
    const reviews = Object.values(useSelector(state => state.reviews))
    const history = useHistory()
    let thisTag;
    const [displayReview, setDisplayReview] = useState(false)
    const dispatch = useDispatch()
    const owners = Object.values(useSelector(state => state.users))
    let owner;

    if(owners && owners.length > 0){
        owner = owners.find(owner => owner.id === business.userId)
    }


    useEffect(()=> {dispatch(getBusinessReviews())},[dispatch])
    useEffect(()=> {dispatch(getAllUsers())},[dispatch])

    let thisReviews;
    if(reviews && business && reviews.length > 0){
    thisReviews = reviews.filter(review => {
        if(review.businessId === business.id){
            console.log(review)
            return review
        }
    })
}


    if (allTags && business) {
        thisTag = allTags[business.tagId]
    }
    if (!sessionUser) {
        sessionUser = { id: 0 }
    }

    const handleEdit = business => {
        history.push(`/business/edit/${business.id}`)
    }




    return (
        <>
            {business &&
                <div id='single-business-wrapper'>
                    <div style={{ background: `url(${business.photoUrl})` }} id='single-business-img'>
                        <div className='single-business-infomation'>
                            <h1 className='business-header'>{business.title}</h1>
                            <h2 className='business-type'>{thisTag}</h2>
                            <h2 className='business-hours'><span className='hours-text'>Hours:</span> {business.hours}</h2>
                            {owner && 
                            <>
                            <h2 className='owner-head'>Owner:</h2>
                            <div className='owner-div'>
                                <img alt='owner-pic' className='owner-pic' src={owner.picSrc}></img>
                                <h3 className='owner-name'>{owner.fullName}</h3>
                            </div>
                            </>
                            }
                            
                            <div className='button-container'>
                            <Likes businessId={business.id} />
                            {sessionUser.id === business.userId && <button onClick={() => handleEdit(business)} className='edit-button'>Edit Business</button>}
                            {sessionUser.id && <button onClick={() => setDisplayReview(!displayReview)} className='edit-button'>Review Business</button>}
                            </div>
                        </div>
                    </div>
                    {reviews && displayReview && <ReviewForm setDisplayReview={setDisplayReview} business={business} />}
                    <div className='description-div'>
                        <p className='description-text'>Description</p>
                        <p>{business.description}</p>
                    </div>
                    <div className='single-business-location'>
                        <p className='location-text'> Location & Hours</p>
                        <div className='location-hours-div'>
                            <div className='address'>
                                <p>Address</p>
                                <p>{business.address}</p>
                                <p>{business.city} {business.state}, {business.zipcode}</p>
                            </div>
                            <div className='Hours'>
                                <p>Hours</p>
                                <p>{business.hours}</p>
                            </div>
                        </div>
                    </div>
                    <div className='reivew-div'>
                        <p id='reviews-header'>Reviews</p>
                        {thisReviews.length < 1 && <p>No Reviews Yet</p>}
                        {thisReviews.length > 0 &&
                            thisReviews.map(review => <ReviewDisplay key={review.id} business={business} review={review} />)
                        }
                    </div>
                </div>
            }
        </>
    )

}


export default BusinessSingle
