import { csrfFetch } from './csrf';

const ADD_REVIEW = 'review/add'
const LOAD_REVIEW = 'review/load'
const DELETE_REVIEW = 'review/delete'

const addReview = newReview => {
    return {
        type: ADD_REVIEW,
        newReview
    }
}

const deleteRev = reviewId => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }

}

const loadReviews = reviews => {
    return {
        type: LOAD_REVIEW,
        reviews
    }
}




export const getBusinessReviews = businessId => async dispatch => {
    const response = await csrfFetch(`/api/reviews`)
    if(response.ok){
        console.log(response)
        const businessReviews = await response.json()
        dispatch(loadReviews(businessReviews))
    }
}

export const deleteReview = reviewId => async dispatch => {
    const response = await csrfFetch(`/api/reviews`, {
        method: 'DELETE',
        body: JSON.stringify({reviewId})
    })

    if(response.ok){
        const deletedId = await response.json()
        dispatch(deleteRev(deletedId))
    }
}

export const editReview = review => async dispatch => {
    const response = await csrfFetch(`/api/reviews`, {
        method: 'PUT',
        body: JSON.stringify(review)
    })
    if(response.ok){
        const editedReview = await response.json()
        
        dispatch(addReview(editedReview))
        return editReview
    }
}

export const createReview = review => async dispatch => {

    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    })

    if(response.ok){
        const newReview = await response.json()
        dispatch(addReview(newReview))
        return newReview
    }
    
    return response
}

const reviewReducer = (state={}, action) => {
    switch (action.type){
        case ADD_REVIEW:
            let newState = {...state}
            newState[action.newReview.id] = action.newReview
            return newState
        case LOAD_REVIEW:
            let newLoadState = {}
            action.reviews.map(review => newLoadState[review.id] = review)
            return newLoadState
        case DELETE_REVIEW:
            let newDelState = {...state}
            delete newDelState[action.reviewId]
            return newDelState
        default:
            return state
    }
}

export default reviewReducer
