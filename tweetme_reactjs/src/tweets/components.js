import React, { useState, useEffect } from 'react'
import { TweetCreate, TweetFeed } from '.'
import { apiTweetDetail } from '../lookups'
import { Tweet } from './DetailTweet'

export const TweetComponent = (props) => {
    //const token = localStorage.getItem("token");
    const canTweet = localStorage.getItem("signedIn")
    console.log(canTweet);

    const [newTweets, setNewTweets] = useState([])

    const handleNewTweet = (newTweet) => {
        let tempNewTweet = [...newTweets]
        tempNewTweet.unshift(newTweet)
        setNewTweets(tempNewTweet)
    }
    return canTweet && (<div>
        <TweetCreate didTweet={handleNewTweet} />
        <TweetFeed newTweets={newTweets} />
        {/* <TweetList newTweets={newTweets} {...props} /> */}
    </div>)
}

export const TweetDetailComponent = (props) => {
    const { tweetid } = props
    const [didLookUp, setDidLookUp] = useState(false)
    const [tweet, setTweet] = useState(null)

    const handleBackendLoopUp = (response, status) => {
        if (status === 200)
            setTweet(response)
        else
            alert("There was an error finding your tweet")
    }
    useEffect(() => {
        console.log("use effect called");
        if (didLookUp === false) {
            apiTweetDetail(tweetid, handleBackendLoopUp)
            setDidLookUp(true)
        }
    }, [tweetid, didLookUp, setDidLookUp])

    return tweet === null ? null : <Tweet tweet={tweet} />

}

