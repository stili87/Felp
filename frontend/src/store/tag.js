import { csrfFetch } from "./csrf"

const GET_TAGS = 'tags/all'

const getTags = tags =>{
    return {
        type: GET_TAGS,
        tags
    }
}

export const getAllTags = () => async dispatch => {
    const res = await csrfFetch('/api/tags')
    const allTags = await res.json()
    dispatch(getTags(allTags))
}

const tagReducer = (state={}, action) => {
    switch (action.type) {
        case GET_TAGS:
            const newState = {}
            action.tags.forEach(tag => newState[tag.id] = tag.type)
            return newState
        default:
            return state
    }
}



export default tagReducer
