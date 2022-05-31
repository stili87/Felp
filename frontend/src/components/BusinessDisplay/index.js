import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './business-display.css'
import { deleteBusinessThunk } from "../../store/business";
import BusinessCard from "../BusinessCard";

const BusinessDisplay = () => {
    const allBusinesses = Object.values(useSelector(state => state.businesses))
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
            .then(() => history.push('/'))
    }




    return (
        <>
        {allBusinesses &&
        <div id='main-page-full-container'>
            <div id='main-page-image'>
                <h1 id='main-page-header'>Find the Right Business for Whatever You Need</h1>
            </div>
            <h2 id='all-businesses-subhead'>All Businesses</h2>
            <div id='business-container'>
                {allBusinesses.map(business =>
                    <BusinessCard key={business.id} business={business} />
                )}
            </div>
        </div>
        }
        </>
    )
}

export default BusinessDisplay
