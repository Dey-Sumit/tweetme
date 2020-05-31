import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsDown, faRetweet } from '@fortawesome/free-solid-svg-icons'

import { apiTweetAction } from '../lookups'


export const ActionBtn = ({ tweet, action, didPerformAction }) => {
    const likes = tweet.likes ? tweet.likes : 0;
    //const [userDidLike, setUserDidLike] = useState(false)
    //const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)

    let className = 'btn btn-sm btn-primary mx-1'
    if (action.type === 'retweet')
        className = `btn  btn-sm mx-1 btn-outline-info`
    const actionDisplay = action.display ? action.display : "action"
    const handleBackendAction = (response, status) => {
        console.log(response, status)
        if ((status === 200 || status === 201) && didPerformAction) {
            //setLikes(response.likes)
            didPerformAction(response, status)
        }
    }
    const handleClick = (event) => {
        event.preventDefault()
        apiTweetAction(tweet.id, action.type, handleBackendAction)
    }
    if (action.type === 'like')
        return <span className='icon'><FontAwesomeIcon icon={faHeart} onClick={handleClick} /> {likes} </span>
    else if (action.type === 'unlike')
        return <span className='icon'><FontAwesomeIcon icon={faThumbsDown} onClick={handleClick} /> </span>
    else
        return <span className='icon'><FontAwesomeIcon icon={faRetweet} onClick={handleClick} /></span>
}
