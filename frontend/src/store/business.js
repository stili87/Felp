import { csrfFetch } from './csrf';

// const ADD_BUSINESS = 'business/create'

// const addBusiness = business => {
//     return {
//         type: ADD_BUSINESS,
//         business
//     };
// };

export const createBusiness = business => async dispatch => {
    console.log(business)
    const response = await csrfFetch('/api/businesses', {
        method: "POST",
        body: JSON.stringify(business)
    })
    const newBusiness = await response.json()
    if(newBusiness) console.log('sucess')
    return newBusiness
}
