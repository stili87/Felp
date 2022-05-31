import React from "react";
import './business-card.css'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const BusinessCard = ({ business }) => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const handleEdit = business => {
        history.push(`/business/edit/${business.id}`)
    }

    // const handleDelete = business => {
    //     dispatch(deleteBusinessThunk(business))
    //         .then(() => history.push('/'))
    // }

    return (
        <div className="business-card-wrapper">
            <img className="business-card-img" alt="business" onClick={() => history.push(`business/${business.id}`)} src={business.photoUrl} />
            <p className="business-card-name" onClick={() => history.push(`business/${business.id}`)}>{business.title}</p>
            <p className="business-card-descrip">{business.description}</p>
            <p className="business-card-address">{business.address}</p>
            <p className="business-card-address">{business.city} {business.state}, {business.zipcode}</p>
            <p className="business-card-phone">{business.phone}</p>
            {sessionUser && sessionUser.id === business.userId && <button className="business-card-delete" onClick={() => handleEdit(business)}>Edit Business</button>}
                {/* {sessionUser && sessionUser.id === business.userId && <button onClick={() => handleDelete(business)}>Delete Business</button>} */}

        </div>
    )
}

export default BusinessCard
