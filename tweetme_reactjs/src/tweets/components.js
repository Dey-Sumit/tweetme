import React, { useEffect, useState } from 'react'
import { apiTweetList, apiTweetCreate, apiTweetAction } from '../lookups'


//create a tweet using tweetCreateAPi call , add it to the list in the server and call again tweetsLoad api,o every time a new tweet comes,call tweetLoad again..
// but we are not following this approach 
// app is calling tweetsLoad api only once stored it's response in an array(tweetsInit[])(when first login)
// when new tweet is created ,it is stored in an different array[newTweets[]] and pass it to tweetsList component
// the tweetlist component concat tweetInit[] and newTweets[] ,and create a final array (tweets[]) render it with tweets.map()
// so less api call :)

export const TweetList = ({ newTweets }) => {
    //console.log(newTweets);

    const [tweetsInit, setTweetsInit] = useState([])//initial tweet 
    const [tweets, setTweets] = useState([])
    const [tweetDidSet, setTweetDidSet] = useState(false)

    //componentDidUpdate
    useEffect(() => {
        let finalTweets = [...newTweets].concat(tweetsInit)

        //when we have new tweet -->
        //first time tweets.length ==0 (!= final.length),so it updated the tweets which renders tweets.map()
        if (finalTweets.length !== tweets.length) {
            console.log("tweets.len", tweets.length);

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
            apiTweetList(handleBackendTweetList)
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

export const TweetCreationForm = (props) => {
    const [newTweets, setNewTweets] = useState([])
    const tweet_text_ref = React.createRef()
    let tempNewTweet = [...newTweets]
    const handleBackendUpdate = (response, status) => {

        //backend api handler
        if (status === 201) {
            // console.log("tweet created");
            //console.log(response);
            tempNewTweet.unshift(response)
            setNewTweets(tempNewTweet)
        }
        else
            console.log(status, response);
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const new_val = tweet_text_ref.current.value
        //     console.log(new_val)
        apiTweetCreate(new_val, handleBackendUpdate)
        tweet_text_ref.current.value = ''
    }
    return (
        <div>
            <div className="col-8 my-4">
                <form action="" onSubmit={handleSubmit}>
                    <textarea required ref={tweet_text_ref} className="form-control" placeholder='tweet it...'></textarea>
                    <button type='submit' className='btn btn-secondary mt-2'>tweet</button>
                </form>
            </div>
            <TweetList className='mt-10' newTweets={newTweets} />
        </div>
    )
}

const ParentTweet = ({ tweet }) => {
    //  console.log(tweet);

    return tweet.parent ?
        <div className='bg-warning'><p className='px-2'>retweet</p>
            <Tweet hideActions={true} tweet={tweet.parent} />
        </div> : null
}

export const Tweet = ({ tweet, didRetweet, hideActions }) => {
    //console.log(tweet);

    const [actionTweet, setActionTweet] = useState(tweet ? tweet : null)

    // when triggesrs it gets the response(new tweet data) from server , it changes the state of the action tweet to the response  
    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200)
            setActionTweet(newActionTweet)
        else if (status === 201) {
            if (didRetweet) {
                didRetweet(newActionTweet)
                console.log("retweeted")
            }
        }
    }
    return (
        <div className="card mx-4 my-2">
            <div className="card-body">
                <div>
                    <p className='py-2 my-2 text text-dark bg-white border text-center'>
                        {tweet.id}- {tweet.content}
                    </p>
                    <ParentTweet tweet={tweet} />
                </div>
                {(actionTweet && hideActions !== true) && <div className="btn btn-group">
                    <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'like', 'display': 'Likes' }} />
                    <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'unlike', 'display': 'Unlike' }} />
                    <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'retweet', 'display': 'Retweet' }} />
                </div>
                }
            </div>
        </div>
    )
}

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
        //console.log(action.type);
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
}
