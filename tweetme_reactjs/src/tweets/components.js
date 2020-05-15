import React, { useEffect, useState } from 'react'
import { loadTweets } from '../lookups'



export const TweetList = ({ newTweets }) => {
    console.log(newTweets);

    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [tweetDidSet, setTweetDidSet] = useState(false)

    //componentDidUpdate
    useEffect(() => {
        let finalTweets = [...newTweets].concat(tweetsInit)
        if (finalTweets.length !== tweets.length) {
            setTweets(finalTweets)
        }
    }, [newTweets, tweetsInit, tweets])

    // triggesrs only when loadTweets changes
    useEffect(() => {
        if (tweetDidSet === false) {
            console.log("use effect");
            const mycallback = (response, status) => {
                if (status === 200)
                    setTweetsInit(response)
                else
                    console.log("There is an error;probably the django server is not running");
            }
            loadTweets(mycallback)
            setTweetDidSet(true)
        }
    }, [tweetsInit, tweetDidSet, setTweetDidSet])

    return <div>{
        tweets.map((tweet, index) =>
            <Tweet key={index} tweet={tweet} />
        )
    }</div>
}

export const Tweet = (props) => {
    const { tweet } = props
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{tweet.id}</h5>
                <p className='py-2 my-2 text text-dark bg-white border text-center'> {tweet.content}</p>
                <div className="btn btn-group">
                    <ActionBtn tweet={tweet} action={{ 'type': 'like', 'display': 'Likes' }} />
                    <ActionBtn tweet={tweet} action={{ 'type': 'unlike', 'display': 'Unlike' }} />
                    <ActionBtn tweet={tweet} action={{ 'type': 'retweet', 'display': 'Retweet' }} />
                </div>
            </div>
        </div>

    )
}


export const TweetCreationForm = (props) => {

    const [newTweets, setNewTweets] = useState([])
    const tweet_text_ref = React.createRef()
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event);
        const new_val = tweet_text_ref.current.value
        console.log(new_val)
        tweet_text_ref.current.value = ''
        let tempNewTweets = [...newTweets]
        //change to server side call
        tempNewTweets.unshift({
            content: new_val,
            likes: 0,
            id: 1234
        })
        setNewTweets(tempNewTweets)

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


export const ActionBtn = ({ tweet, action }) => {
    // states
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const [userLike, setuserLike] = useState(false)

    let className = 'btn btn-primary mt-2 mx-2'
    if (action.type === 'retweet')
        className = `btn mt-2 mx-2 btn-outline-info`

    const actionDisplay = action.display ? action.display : "action"
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay

    const handleClick = (event) => {
        event.preventDefault()
        console.log(action.type);
        if (action.type === 'like') {
            if (!userLike) {
                //like it
                setLikes(likes + 1)
            }
            else {
                setLikes(likes - 1)
                setuserLike(false)
            }
        }
    }

    return <button className={className} onClick={handleClick}>{display}</button>
}
