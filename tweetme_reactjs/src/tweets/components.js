import React, { useState, useEffect } from 'react'
import { TweetList, TweetCreate } from '.'
import { apiTweetDetail } from '../lookups'
import { Tweet } from './DetailTweet'

export const TweetComponent = (props) => {
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true
    const handleNewTweet = (newTweet) => {
        let tempNewTweet = [...newTweets]
        tempNewTweet.unshift(newTweet)
        setNewTweets(tempNewTweet)
    }
    return (<div className="">
        {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='mx-2 my-4' />}
        <TweetList newTweets={newTweets} {...props} />
    </div>)
}


export const TweetDetailComponent = (props) => {
    const { tweetid } = props
    console.log(tweetid);

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

