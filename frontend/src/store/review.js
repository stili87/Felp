import { csrfFetch } from './csrf';

const ADD_REVIEW = 'review/add'

const addReview = newReview => {
    return {
        type: ADD_REVIEW,
        newReview
    }
}

export const createReview = review => async dispatch => {

    const response = csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const newReview = await response.json()
        dispatch(addReview(newReview))
        return newReview
    }
}

const reviewReducer = (state={}, action) => {
    switch (action.type){
        case ADD_REVIEW:
            console.log('hit reducer')
            let newState = {...state}
            newState[action.newReview.id] = action.newReview
            return newState
        default:
            return state
    }
}

export default reviewReducer
