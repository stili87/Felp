import React, {useEffect} from "react";
import './business-display.css'
import BusinessCard from "../BusinessCard";
import { useSelector } from "react-redux";

const BusinessDisplay = () => {
    const allBusinesses = Object.values(useSelector(state => state.businesses))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
        {allBusinesses &&
        <div id='main-page-full-container'>
            <div id='main-page-image'>
            <h1 id='main-page-header'>Welcome to Felp</h1>
                <h1 id='main-page-subheader'>Find the Right Business for All Your Needs</h1>
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
