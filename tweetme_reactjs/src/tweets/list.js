import React, { useState, useEffect } from 'react'
import { apiTweetList } from '../lookups'
import { Tweet } from '.'

export const TweetList = (props) => {
    let { newTweets } = props
    const [tweetsInit, setTweetsInit] = useState([])//initial tweet 
    const [tweets, setTweets] = useState([])
    const [tweetDidSet, setTweetDidSet] = useState(false)

    //componentDidUpdate
    useEffect(() => {
        let finalTweets = [...newTweets].concat(tweetsInit)
        //when we have new tweet -->
        //first time tweets.length ==0 (!= final.length),so it updated the tweets which renders tweets.map()
        if (finalTweets.length !== tweets.length) {
            setTweets(finalTweets)
            console.log("final tweets Updated");
        }
    }, [newTweets, tweetsInit, tweets])

    // renders when component mounts,(triggesrs only when loadTweets changes)
    useEffect(() => {
        if (tweetDidSet === false) {
            console.log("tweetsLoadApi called");
            const handleBackendTweetList = (response, status) => {
                if (status === 200) {
                    setTweetsInit(response)
                    setTweetDidSet(true)
                }
                else
                    console.log("There is an error;probably the django server is not running");
            }
            apiTweetList(props.username, handleBackendTweetList)
        }
    }, [tweetsInit, tweetDidSet, setTweetDidSet])

    const handleDidRetweet = (newTweet) => {
        // :(
        const updatedTweetsInit = [...tweetsInit]
        updatedTweetsInit.unshift(newTweet)
        setTweetsInit(updatedTweetsInit)

        const updatedFinalTweets = [...tweets]
        updatedFinalTweets.unshift(newTweet)
        setTweetsInit(updatedFinalTweets)
    }

    return <div>{
        tweets.map((tweet, index) =>
            <Tweet key={index}
                didRetweet={handleDidRetweet} tweet={tweet} />
        )
    }</div>
}
