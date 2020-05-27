import React from 'react'
import { apiTweetCreate } from '../lookups'

//create a tweet using tweetCreateAPi call , add it to the list in the server and call again tweetsLoad api,o every time a new tweet comes,call tweetLoad again..
// but we are not following this approach 
// app is calling tweetsLoad api only once stored it's response in an array(tweetsInit[])(when first login)
// when new tweet is created ,it is stored in an different array[newTweets[]] and pass it to tweetsList component
// the tweetlist component concat tweetInit[] and newTweets[] ,and create a final array (tweets[]) render it with tweets.map()
// so less api call :)

export const TweetCreate = (props) => {
    const tweet_text_ref = React.createRef()
    const { didTweet } = props

    const handleBackendUpdate = (response, status) => {
        //backend api handler
        if (status === 201)
            didTweet(response)
        else
            console.log(status, response);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const new_val = tweet_text_ref.current.value
        apiTweetCreate(new_val, handleBackendUpdate)
        tweet_text_ref.current.value = ''
    }

    return (
        <div className="col-10 mx-auto my-4">
            <form action="" onSubmit={handleSubmit}>
                <textarea required ref={tweet_text_ref} className="form-control" placeholder='tweet it...'></textarea>
                <button type='submit' className='btn btn-secondary mt-2'>tweet</button>
            </form>
        </div>
    )
}
