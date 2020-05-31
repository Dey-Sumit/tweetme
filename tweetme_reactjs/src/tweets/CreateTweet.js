import React from 'react'
import { api_fetch_tweet_create } from '../Version_2/fetch_api/fetch_lookups'

//create a tweet using tweetCreateAPi call , add it to the list in the server and call again tweetsLoad api,o every time a new tweet comes,call tweetLoad again..
// but we are not following this approach 
// app is calling tweetsLoad api only once stored it's response in an array(tweetsInit[])(when first login)
// when new tweet is created ,it is stored in an different array[newTweets[]] and pass it to tweetsList component
// the tweetlist component concat tweetInit[] and newTweets[] ,and create a final array (tweets[]) render it with tweets.map()
// so less api call :)

export const TweetCreate = (props) => {
    console.log("Tweetcreate");
    let token = null
    if (localStorage.getItem("signedIn"))
        token = localStorage.getItem("token")

    const tweet_text_ref = React.createRef()
    const { didTweet } = props

    const handleBackendUpdate = (response) => {
        //backend api handler
        didTweet(response)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const new_val = tweet_text_ref.current.value
        api_fetch_tweet_create(token, handleBackendUpdate, new_val)
        tweet_text_ref.current.value = ''
    }

    return (
        <div className="pt-4 pr-4 pb_c-60 border_bottom_custom">
            <form action="" onSubmit={handleSubmit}>
                <textarea required ref={tweet_text_ref} className="form-control bg-transparent border-0" placeholder="donate a tweet :)  "></textarea>
                <button type='submit' className='btn btn-info float-right width_c-100 border_radius_c-20 mt-2'>tweet</button>
            </form>
        </div>
    )
}
