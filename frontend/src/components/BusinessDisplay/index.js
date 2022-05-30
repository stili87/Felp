import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './business-display.css'
import { deleteBusinessThunk } from "../../store/business";

const BusinessDisplay = () => {
    const allBusinesses = Object.entries(useSelector(state => state.businesses))
    const allTags = useSelector(state => state.tags)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const dispatch = useDispatch()

    const handleEdit = business => {
        history.push(`/business/edit/${business.id}`)
    }

    const handleDelete = business => {
        console.log('delete hit')
        dispatch(deleteBusinessThunk(business))
            .then(()=> history.push('/'))


          }


    

    return(
        <div>
            {allBusinesses.map(business =>
                <ul key={business[0]}>
                   <li>{business[1].title}</li>
                   <li>{business[1].address} {business[1].city} {business[1].state} {business[1].zipcode}</li>
                   <li>{allTags[business[1].id]}</li>
                   <li>{business[1].description}</li>
                   <li><a href={business[1].websiteUrl} target="_blank">Website</a></li>
                   <li>{business[1].phone}</li>
                   <img className="business-img" alt='of business' src={business[1].photoUrl} />
                   {sessionUser && sessionUser.id === business[1].userId && <button onClick={() => handleEdit(business[1])}>Edit Business</button>}
                   {sessionUser && sessionUser.id === business[1].userId && <button onClick={() => handleDelete(business[1])}>Delete Business</button>}
                   {sessionUser &&  <li>Review Button</li>}
                </ul>
                 
                 )}
        </div>
    )
}

export default BusinessDisplay
