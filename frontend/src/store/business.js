import { csrfFetch } from './csrf';
const GET_ALL_BUSINESS = '/business/all'
const ADD_BUSINESS = '/business/create'
const DELETE_BUSINESS = '/business/delete'

const actionAddBusiness = business => {
    return {
        type: ADD_BUSINESS,
        business
    };
};

const actionAllBusinesses = businesses => {
    return {
        type: GET_ALL_BUSINESS,
        businesses
    }
}
const actionDeleteBusinesses = businessId => {
    return {
        type: DELETE_BUSINESS,
        businessId
    }
}

export const getAllBusinesses = () => async dispatch => {
    const response = await csrfFetch('/api/businesses')
    const allBussiness = await response.json()
    dispatch(actionAllBusinesses(allBussiness))
}

export const createBusiness = business => async dispatch => {
const {
    hours,
    userId,
    title,
    description,
    address,
    city,
    state,
    zipcode,
    phone,
    websiteUrl,
    tagId, 
    image } = business

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("hours", hours);
    formData.append("zipcode", zipcode);
    formData.append("phone", phone);
    formData.append("websiteUrl", websiteUrl);
    formData.append("tagId", tagId);
    
    if(image) formData.append("image", image);
    


    const response = await csrfFetch('/api/businesses', {
        method: "POST",
        headers: {"Content-Type": "multipart/form-data"},
        body: formData
    })

    const newBusiness = await response.json()
    if(newBusiness){
        dispatch(actionAddBusiness(newBusiness))
    }
    return newBusiness
}

export const editBusinessThunk = editBusiness => async dispatch => {
    const {
        id,
        hours,
        userId,
        title,
        description,
        address,
        city,
        state,
        zipcode,
        phone,
        websiteUrl,
        tagId, 
        image } = editBusiness
        console.log(editBusiness)
    
        const formData = new FormData();
        formData.append("id", id);
        formData.append("userId", userId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("hours", hours);
        formData.append("zipcode", zipcode);
        formData.append("phone", phone);
        formData.append("websiteUrl", websiteUrl);
        formData.append("tagId", tagId);
        if(image) formData.append("image", image);


    const response = await csrfFetch('/api/businesses', {
        method: 'PUT',
        headers: {"Content-Type": "multipart/form-data"},
        body: formData
    })
    const editedBusiness = await response.json()
    console.log(editBusiness)
        dispatch(actionAddBusiness(editBusiness))
   
    return editedBusiness
}

export const deleteBusinessThunk = deleteBusiness => async dispatch => {
    const response = await csrfFetch('/api/businesses', {
        method: "DELETE",
        body: JSON.stringify(deleteBusiness)
    })
    const deleteResultId = await response.json()
    dispatch(actionDeleteBusinesses(deleteResultId))
    return deleteResultId
}

const businessReducer = (state={}, action) => {
    switch (action.type) {
        case GET_ALL_BUSINESS:
            const newState = {}
            action.businesses.forEach(business => newState[business.id] = business)
            return newState
        case ADD_BUSINESS:
            let newAddState = {}
            newAddState = {...state, [action.business.id]: action.business}
            return newAddState
        case DELETE_BUSINESS:
                const newDelState = {...state}
                delete newDelState[action.businessId]
                return newDelState
        default:
            return state
        }

}

export default businessReducer
