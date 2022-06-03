import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './likes-css.css'
import { addLikeThunk, getLikeThunk } from '../../store/like';
import { deleteLikeThunk } from '../../store/like';


const Likes = ({ businessId }) => {
    let sessionUser = useSelector(state => state.session.user);
    let userId
    if(sessionUser){
        userId = sessionUser.id
    }
    
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)

    useEffect( () => {
       const getLikes =  async() => {
        const likes = await dispatch(getLikeThunk(businessId))
        const thisUser = likes.find(like => like.userId === userId)
        thisUser ? setLiked(true) : setLiked(false)
        const totalLikes = likes.length
        setTotalLikes(totalLikes)
        }
        getLikes()
    },[dispatch, setTotalLikes, businessId, userId])

    const handleLike = async () => {
        if (liked) {
            const like = { businessId, userId }
            dispatch(deleteLikeThunk(like))
            setTotalLikes(totalLikes - 1)
        } else {
            setTotalLikes(totalLikes + 1)
            const like = { businessId, userId }
            dispatch(addLikeThunk(like))
        }
        setLiked(!liked)
    }

    return (
        <div className="likes-div">
            {sessionUser && <button onClick={() => handleLike()} className={'button-unliked'}>{!liked ? 'Like this Business' : 'Unlike this Business'}</button>}
            <p className='likeCounter'>Likes: {totalLikes}</p>
        </div>
    )

}

export default Likes
