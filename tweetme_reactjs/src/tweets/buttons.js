import React from 'react'

import { apiTweetAction } from '../lookups'


export const ActionBtn = ({ tweet, action, didPerformAction }) => {
    const likes = tweet.likes ? tweet.likes : 0;
    //const [userDidLike, setUserDidLike] = useState(false)
    //const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)

    let className = 'btn btn-primary mt-2 mx-2'
    if (action.type === 'retweet')
        className = `btn mt-2 mx-2 btn-outline-info`
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
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
}
