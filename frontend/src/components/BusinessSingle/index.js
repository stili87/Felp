import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import './business-single.css'
import { getAllTags } from '../../store/tag'


const BusinessSingle = () => {
    const businessId = useParams().businessId
    const business = useSelector(state => state.businesses)[businessId]
    const allTags = useSelector(state => state.tags)
    let sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    let thisTag;
    if(allTags && business){
        thisTag = allTags[business.tagId]
    }
    if(!sessionUser){
        sessionUser = {id: 0}
    }
    const dispatch = useDispatch()

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
                </div>
            </div>
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
            </div>
        </div>
    }
</> 
    )

}


export default BusinessSingle
