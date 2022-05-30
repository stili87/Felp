import { csrfFetch } from './csrf';
const GET_ALL_BUSINESS = '/business/all'
const ADD_BUSINESS = 'business/create'
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
    const response = await csrfFetch('/api/businesses', {
        method: "POST",
        body: JSON.stringify(business)
    })
    const newBusiness = await response.json()
    if(newBusiness){
        dispatch(actionAddBusiness(newBusiness))
    }
    return newBusiness
}

export const editBusinessThunk = editBusiness => async dispatch => {
    const response = await csrfFetch('/api/businesses', {
        method: 'PUT',
        body: JSON.stringify(editBusiness)
    })
    const editedBusiness = await response.json()
    if(editBusiness){
        dispatch(actionAddBusiness(editBusiness))
    }
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
