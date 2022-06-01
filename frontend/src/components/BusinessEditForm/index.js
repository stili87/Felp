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
    const [description, setDescription] = useState(editBusiness.description|| '')
    const [address, setAddress] = useState(editBusiness.address|| '')
    const [city, setCity] = useState(editBusiness.city|| '')
    const [state, setState] = useState(editBusiness.state|| '')
    const [zipcode, setZipcode] = useState(editBusiness.zipcode|| '')
    const [phone, setPhone] = useState(editBusiness.phone|| '')
    const [photoUrl, setPhotoUrl] = useState(editBusiness.photoUrl|| '')
    const [websiteUrl, setWebsiteUrl] = useState(editBusiness.websiteUrl|| '')

    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        if(!sessionUser || sessionUser.id !== editBusiness.userId) {
            history.push('/')
        }},[])


    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const userId = sessionUser.id
        const editingBusiness = {
            id: editBusiness.id,
            userId,
            title,
            description,
            address,
            city,
            state,
            zipcode,
            phone,
            photoUrl,
            websiteUrl,
            tagId
        }
        dispatch(editBusinessThunk(editingBusiness))
            .then(()=> history.push('/'))
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
    // {sessionUser && sessionUser.id !== editBusiness.userId && <div>You are not authorized to edit this business</div>}
    // {sessionUser && sessionUser.id === editBusiness.userId &&

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
                <input
                    name="photoUrl"
                    type='text'
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                    placeholder='Business Picture Url'
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
