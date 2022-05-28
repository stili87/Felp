import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './business-form.css'

const BusinessFormPage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [phone, setPhone] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [websiteUrl, setWebsiteUrl] = useState('')
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const handleOnSubmit = (e) => {
        const userId = sessionUser.id
        e.preventDefault()
       const newBusiness = {
            userId,
            title,
            description,
            address,
            city,
            state,
            zipcode,
            phone,
            photoUrl,
            websiteUrl
        }
    }
    
return (
    <>
    <form id='business-form' onSubmit={e => handleOnSubmit(e)}>
    <label>Business Name:</label>
    <input
    name='title'
    value={title}
    onChange={e => setTitle(e.target.value)}
    type="text"
    placeholder="Business Name here"
    />
    <label>Business Description:</label>
    <textarea
    name='description'
    value={description}
    onChange={e => setDescription(e.target.value)}
    type="text"
    placeholder="Business Description Here"
    />
    <label>Address</label>
    <input
    name="address"
    type='text'
    value={address}
    onChange={e=>setAddress(e.target.value)}
    placeholder='Business Address'
    />
    <label>City</label>
      <input
    name="city"
    type='text'
    value={city}
    onChange={e=>setCity(e.target.value)}
    placeholder='Business City'
    />
    <label>State</label>
        <input
    name="state"
    type='text'
    value={state}
    onChange={e=>setState(e.target.value)}
    placeholder='Business State'
    />
    <label>Zipcode</label>
    <input
    name="zipcode"
    type='text'
    value={zipcode}
    onChange={e=>setZipcode(e.target.value)}
    placeholder='Business Zipcode'
    />
    <label>Phone Number</label>
    <input
    name="phone"
    type='text'
    value={phone}
    onChange={e=>setPhone(e.target.value)}
    placeholder='Business Phone Number'
    />
    <label>Picture URL</label>
    <input
    name="photoUrl"
    type='text'
    value={photoUrl}
    onChange={e=>setPhotoUrl(e.target.value)}
    placeholder='Business Picture Url'
    />
    <label>Website URL</label>
    <input
    name="websiteUrl"
    type='text'
    value={websiteUrl}
    onChange={e=>setWebsiteUrl(e.target.value)}
    placeholder='Business Website Url'
    />
    <button id="business-form-submit" type="submit">Submit</button>

    </form>

    </>
)
}

export default BusinessFormPage
