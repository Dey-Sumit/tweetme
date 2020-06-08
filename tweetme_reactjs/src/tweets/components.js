import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { TweetCreate, TweetFeed } from '.'

import { Tweet } from './Tweet'

export const TweetComponent = () => {
    //const token = localStorage.getItem("token");
    const canTweet = localStorage.getItem("signedIn")
    console.log(canTweet);

    const [newTweets, setNewTweets] = useState([])

    const handleNewTweet = (newTweet) => {
        let tempNewTweet = [...newTweets]
        tempNewTweet.unshift(newTweet)
        setNewTweets(tempNewTweet)
    }
    return canTweet ? (<div>
        <TweetCreate didTweet={handleNewTweet} />
        <TweetFeed newTweets={newTweets} />
        {/* <TweetList newTweets={newTweets} {...props} /> */}
    </div>) : <Redirect to='/login/' />
}

