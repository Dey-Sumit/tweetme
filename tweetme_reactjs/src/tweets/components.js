import React, { useState } from 'react'
import { TweetList, TweetCreate } from '.'


export const TweetComponent = (props) => {
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true
    const handleNewTweet = (newTweet) => {
        let tempNewTweet = [...newTweets]
        tempNewTweet.unshift(newTweet)
        setNewTweets(tempNewTweet)
    }
    return (<div className="className">
        {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='mx-2 my-4' />}
        <TweetList newTweets={newTweets} {...props} />
    </div>)
}


