import React, { useState } from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { TippyComponent } from '../Version_2/components'
import { ActionBtn } from '.'
import { UserDisplay } from '../profiles'
import { Link } from 'react-router-dom';

const ParentTweet = ({ tweet, retweeter }) => {
    return tweet.parent ?
        <div className='border rounded'><p className='px-2'>retweet via <UserDisplay user={retweeter} /></p>
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
    return (
        <div className="card">
            <div className="card-body d-flex border_bottom_custom">
                <div className="col-1 px-0">
                    <Tippy placement='bottom' arrow={false} content={<TippyComponent user={tweet.user}></TippyComponent>} >
                        {/* <UserPicture user={tweet.user} /> */}
                        <img src={tweet.user.profilePicture} alt="..." className="rounded_small_image cursor-pointer" />
                    </Tippy>
                </div>
                <div className="col-11 mb-1 ml-3">
                    <div>
                        <p className='pl-2 mx-2'>
                            <UserDisplay user={tweet.user} includeFullName />
                        </p>
                        <p className='py-2 my-2 text-center'>
                            {tweet.content}
                        </p>
                        <ParentTweet tweet={tweet} retweeter={tweet.user} />
                    </div>
                    {(actionTweet && hideActions !== true) &&
                        <div className='d-flex justify-content-around mt-3' >
                            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'comment', 'display': 'Comment' }} />
                            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'like', 'display': 'Likes' }} />
                            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'unlike', 'display': 'Unlike' }} />
                            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ 'type': 'retweet', 'display': 'Retweet' }} />
                            {isDetail === true ? null : <Link to={`/tweet/${tweet.id}`} ><button className='btn btn-sm btn-secondary mx-1'> View</button></Link>}
                        </div>}

                </div>
            </div>
        </div>
    )
}