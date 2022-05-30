import React from "react";
import { useSelector } from "react-redux";
import './business-display.css'

const BusinessDisplay = () => {
    const allBusinesses = Object.entries(useSelector(state => state.businesses))
    const allTags = useSelector(state => state.tags)

    return(
        <div>

            {allBusinesses.map(business =>
                <ul key={business[0]}>
                   <li>{business[1].title}</li>
                   <li>{business[1].address} {business[1].city} {business[1].state} {business[1].zipcode}</li>
                   <li>{allTags[business[1].id]}</li>
                   <li>{business[1].description}</li>
                   <li><a href={business[1].websiteUrl}>Website</a></li>
                   <li>{business[1].phone}</li>
                   <img src={business[1].photoUrl} />
                </ul>
                 
                 )}
        </div>
    )
}

export default BusinessDisplay
