import { csrfFetch } from './csrf';

const GET_LIKES = '/like/get'
const CREATE_LIKE = '/like/create'
const DELETE_LIKE ='/like/delete'

const createLike = like => {
    return {
        type: CREATE_LIKE,
        like
    }
}

const deleteLike = likeId => {
    return {
        type: DELETE_LIKE,
        likeId
    }
}

const getLikes = likes => {
    return {
        type: GET_LIKES,
        likes
    }
}

export const deleteLikeThunk = like => async dispatch =>  {
    const response = await csrfFetch('/api/likes', {
        method: "DELETE",
        body: JSON.stringify(like)
    })
    const deleteResultId = await response.json()
    dispatch(deleteLike(deleteResultId))
}

export const addLikeThunk = like => async dispatch =>  {
    const response = await csrfFetch('/api/likes', {
        method: "POST",
        body: JSON.stringify(like)
    })
    const newLike = await response.json()
    dispatch(createLike(newLike))
}

export const getLikeThunk = businessId => async dispatch =>  {
    const response = await csrfFetch(`/api/likes/${businessId}`)
    const likes = await response.json()
    dispatch(getLikes(likes))
    return likes
}



const likesReducer = (state={}, action) => {
    switch(action.type) {
        case GET_LIKES: 
            let newState = {}
            action.likes.forEach(like => newState[like.id] = like)
            return newState
        case CREATE_LIKE: 
            let newCreateState = {...state}
            newCreateState[action.like.id] = action.like
            return newCreateState
        case DELETE_LIKE: 
            let newDeleteState = {...state}
            delete newDeleteState[action.likeId]
            return newDeleteState
        default:
            return state
    }
}

export default likesReducer
