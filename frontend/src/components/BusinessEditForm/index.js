import React, { useEffect, useState} from "react";
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { editBusinessThunk } from "../../store/business";
import './business-edit.css'
import { deleteBusinessThunk } from "../../store/business";

const BusinessEditForm = () => {
    const allBusinesses = useSelector(state => state.businesses)
    const editBusinessId = useParams().businessId
    const editBusiness = allBusinesses[editBusinessId] || {}
    const sessionUser = useSelector((state) => state.session.user);
    const stateTags = useSelector(state => state.tags)
    const tags = Object.entries(stateTags)
    const [tagId, setTagId] = useState(editBusiness.tagId || '')
    const [title, setTitle] = useState(editBusiness.title || '')
    const [description, setDescription] = useState(editBusiness.description || '')
    const [address, setAddress] = useState(editBusiness.address || '')
    const [city, setCity] = useState(editBusiness.city || '')
    const [state, setState] = useState(editBusiness.state || '')
    const [zipcode, setZipcode] = useState(editBusiness.zipcode || '')
    const [phone, setPhone] = useState(editBusiness.phone || '')
    const [image, setImage] = useState(null)
    const [websiteUrl, setWebsiteUrl] = useState(editBusiness.websiteUrl || '')
    const [hours, setHours] = useState(editBusiness.hours || '')

    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        if(!sessionUser || sessionUser.id !== editBusiness.userId) {
            history.push('/')
        }},[editBusiness.userId, history, sessionUser])


    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const userId = sessionUser.id
        const editingBusiness = {
            id: editBusiness.id,
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
     

        dispatch(editBusinessThunk(editingBusiness))
            .then(()=> history.push(`/business/${editBusiness.id}`))
            .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          })

    }

    const handleDelete = (e, business) => {
        e.preventDefault()
        dispatch(deleteBusinessThunk(editBusiness))
            .then(() => history.push('/'))
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };

    return (
        <div id='business-creation-container'>
            <h1 id="business-creation-header">Edit {editBusiness.title}</h1>
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
                <label>Picture URL</label>
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
                <button id="business-form-submit" onClick={(e) => handleDelete(e, editBusiness)}>Delete Business</button>
            </form>
        </div>
    )

    }

export default BusinessEditForm
