import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import './business-single.css'
import { getAllTags } from '../../store/tag'
import ReviewForm from '../ReviewForm'
import { getBusinessReviews } from '../../store/review'
import ReviewDisplay from '../ReviewDisplay'



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

    useEffect(()=> {
        dispatch(getBusinessReviews(businessId))
    },[dispatch, businessId])

    if(allTags && business){
        thisTag = allTags[business.tagId]
    }
    if(!sessionUser){
        sessionUser = {id: 0}
    }

    const handleEdit = business => {
        history.push(`/business/edit/${business.id}`)
    }

    

    useEffect(() => {
        dispatch(getAllTags())
      },[dispatch])

      useEffect(() => {
        dispatch(getAllTags())
      },[dispatch])

    return (
        <>
        {business &&
            <div id='single-business-wrapper'>
            <div style={{ background: `url(${business.photoUrl})` }} id='single-business-img'>
                <div className='single-business-infomation'>
                    <h1 className='business-header'>{business.title}</h1>
                    <h2 className='business-type'>{thisTag}</h2>
                    <h2 className='business-hours'><span className='hours-text'>Hours:</span> {business.hours}</h2>
                    {sessionUser.id === business.id && <button onClick={() => handleEdit(business)} className='edit-button'>Edit Business</button>}
                    {sessionUser.id &&  <button onClick={() => setDisplayReview(!displayReview)} className='edit-button'>Review Business</button>}
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
                {reviews.length < 1 && <p>No Reviews Yet</p>}
                {reviews.length > 0 &&
                    reviews.map(review => <ReviewDisplay key={review.id} business={business} review={review}/>)
                }
            </div>
        </div>
    }
</> 
    )

}


export default BusinessSingle
