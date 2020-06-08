import React, { useState, useEffect } from 'react'
//import { apiTweetFeed } from '../lookups'
import { Tweet } from '.'
import { api_fetch_tweet_feed } from '../Version_2/fetch_api/fetch_lookups'



export const TweetFeed = (props) => {
    console.log("tweet-feed", props);
    let token = null
    if (localStorage.getItem("signedIn"))
        token = localStorage.getItem("token")
    let { newTweets } = props

    const [tweetsInit, setTweetsInit] = useState([])//initial tweet 
    const [tweets, setTweets] = useState([])
    const [tweetDidSet, setTweetDidSet] = useState(false)
    const [nextUrl, setNextUrl] = useState(null)



    //componentDidUpdate
    //when we have new tweet -->
    //first time tweets.length ==0 (!= final.length),so it updated the tweets which renders tweets.map()
    useEffect(() => {
        let finalTweets = [...newTweets].concat(tweetsInit)
        if (finalTweets.length !== tweets.length) {
            setTweets(finalTweets)
        }
    }, [newTweets, tweetsInit, tweets])

    // renders when component mounts,(triggesrs only when loadTweets changes)
    useEffect(() => {
        if (tweetDidSet === false) {
            const handleBackendTweetList = (response) => {
                setTweetsInit(response.results)
                setNextUrl(response.next)
                setTweetDidSet(true)
            }
            api_fetch_tweet_feed(token, handleBackendTweetList)//fetchApi_tweet_feed
        }
    }, [tweetsInit, tweetDidSet, setTweetDidSet, token])

    const handleDidRetweet = (newTweet) => {
        // :(
        const updatedTweetsInit = [...tweetsInit]
        updatedTweetsInit.unshift(newTweet)
        setTweetsInit(updatedTweetsInit)

        const updatedFinalTweets = [...tweets]
        updatedFinalTweets.unshift(newTweet)
        setTweetsInit(updatedFinalTweets)
    }

    const handleLoadNext = (event) => {
        event.preventDefault()
        if (nextUrl != null) {
            const handleLoadNextResponse = (response) => {
                var nextTweets = response.results
                var finalTweets = [...tweets].concat(nextTweets)
                setTweets(finalTweets)
                setTweetsInit(finalTweets)
                setNextUrl(response.next)
            }
            api_fetch_tweet_feed(token, handleLoadNextResponse, nextUrl)

        }
    }

    return (
        <React.Fragment>

            {<div>{
                tweets.map((tweet, index) =>
                    <Tweet key={index}
                        didRetweet={handleDidRetweet} tweet={tweet} />
                )
            }</div>}
            {nextUrl != null &&
                <div className="text-center mb-5">
                    <button className='btn btn-sm btn-info' onClick={handleLoadNext}>Load More</button>
                </div >}
        </React.Fragment>
    )
}
