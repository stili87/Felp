import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './business-form.css'
import { createBusiness } from "../../store/business";


const BusinessFormPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const stateTags = useSelector(state => state.tags)
    const tags = Object.entries(stateTags)
    const [tagId, setTagId] = useState(1)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [phone, setPhone] = useState('')
    let [image, setImage] = useState(null)
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [errors, setErrors] = useState([]);
    const [hours, setHours] = useState('')
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(()=> {
        if(!sessionUser){
            history.push('/')
        }
    },[history, sessionUser])

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        console.log(image, 'IMAGE!!!!!!!!')
        if(!image){
            image = 'https://hpcismart.com/images/website/ManChemNews/DIR_148/F_85752.jpg'
        }
        console.log(image, 'IMAGE!!!!!!!!')
        
        const userId = sessionUser.id
        const newBusiness = {
            hours,
            userId,
            title,
            description,
            address,
            city,
            state,
            zipcode,
            phone,
            image,
            websiteUrl,
            tagId
        }

        dispatch(createBusiness(newBusiness))
            .then(() => history.push('/'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };

    return (
        <div id='business-creation-container'>
            <h1 id="business-creation-header">Create a New Business</h1>
            <form id='business-form' onSubmit={e => handleOnSubmit(e)}>
                {errors.length > 0 &&
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
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
                <label>Hours:</label>
                <input
                    name='hours'
                    value={hours}
                    onChange={e => setHours(e.target.value)}
                    type="text"
                    placeholder="e.g. 8:00am - 10:00pm"
                />
                <label>Address</label>
                <input
                    name="address"
                    type='text'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder='Business Address'
                />
                <label>City</label>
                <input
                    name="city"
                    type='text'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder='Business City'
                />
                <label>State</label>
                <input
                    name="state"
                    type='text'
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder='Business State'
                />
                <label>Zipcode</label>
                <input
                    name="zipcode"
                    type='text'
                    value={zipcode}
                    onChange={e => setZipcode(e.target.value)}
                    placeholder='Business Zipcode'
                />
                <label>Phone Number</label>
                <input
                    name="phone"
                    type='text'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder='Business Phone Number'
                />
                <label>Image Upload</label>
                <input
                    name="image"
                    type='file'
                    onChange={updateFile}
                    placeholder='Business Picture'
                />
                <label>Website URL</label>
                <input
                    name="websiteUrl"
                    type='text'
                    value={websiteUrl}
                    onChange={e => setWebsiteUrl(e.target.value)}
                    placeholder='Business Website Url'
                />
                <label>Business Type</label>
                <select
                    value={tagId}
                    onChange={e => setTagId(e.target.value)}
                >
                    {tags && tags.map(tag => <option key={tag[0]} value={tag[0]}>{tag[1]}</option>)}
                </select>
                <button id="business-form-submit" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default BusinessFormPage
