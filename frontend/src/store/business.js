import { csrfFetch } from './csrf';
const GET_ALL_BUSINESS = '/business/all'
const ADD_BUSINESS = 'business/create'

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
    dispatch(actionAddBusiness(newBusiness))
    return newBusiness
}

const businessReducer = (state={}, action) => {
    switch (action.type) {
        case GET_ALL_BUSINESS:
            const newState = {}
            action.businesses.forEach(business => newState[business.id] = business)
            return newState
        case ADD_BUSINESS:
            let newAddState = {}
            newAddState = {...state, [action.id]: action}
            return newAddState
        default:
            return state
        }

}

export default businessReducer
