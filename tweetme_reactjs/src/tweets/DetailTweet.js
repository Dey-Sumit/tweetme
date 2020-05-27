import React, { useState } from 'react'

import { ActionBtn } from '.'
import { UserDisplay, UserPicture } from '../profiles'

const ParentTweet = ({ tweet, retweeter }) => {
    return tweet.parent ?
        <div className='bg-secondary'><p className='px-2'>retweet via <UserDisplay user={retweeter} /></p>
            <Tweet hideActions={true} tweet={tweet.parent} />
        </div> : null
}

export const Tweet = ({ tweet, didRetweet, hideActions }) => {
    const path = window.location.pathname
    const idRegex = /(?<tweetId>\d+)/
    const match = path.match(idRegex)
    const urlTweetId = match ? match.groups.tweetId : -1
    const isDetail = `${tweet.id}` === `${urlTweetId}`
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

    const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${tweet.id}`
        
    }

    return (
        <div className="card my-2">
            <div className="card-body d-flex">
                <div className="col-1">
                    {/* <UserPicture user={tweet.user} /> */}
                </div>
                <div className="col-11">
                    <div>
                        <p className='pl-2 mx-2 text text-dark bg-white'>
                            <UserDisplay user={tweet.user} includeFullName />
                        </p>
                        <p className='py-2 my-2 text text-dark bg-white border text-center'>
                            {tweet.content}
                        </p>
                        <ParentTweet tweet={tweet} retweeter={tweet.user} />
                    </div>
                    {(actionTweet && hideActions !== true) &&
                        <div className='d-flex' >
                            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'like', 'display': 'Likes' }} />
                            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'unlike', 'display': 'Unlike' }} />
                            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'retweet', 'display': 'Retweet' }} />
                            {isDetail === true ? null : <button className='btn btn-sm btn-secondary mx-1' onClick={handleLink}> View</button>}
                        </div>}

                </div>
            </div>
        </div>
    )
}
