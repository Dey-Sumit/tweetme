
import React, { useState } from 'react'
import { ActionBtn } from '.'
const ParentTweet = ({ tweet }) => {
    return tweet.parent ?
        <div className='bg-warning'><p className='px-2'>retweet</p>
            <Tweet hideActions={true} tweet={tweet.parent} />
        </div> : null
}

export const Tweet = ({ tweet, didRetweet, hideActions }) => {
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
