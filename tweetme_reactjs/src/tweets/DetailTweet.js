import React, { useState, useEffect } from 'react'
import { apiTweetDetail } from '../lookups'
import { UserDisplay } from '../profiles'
import { Tweet } from '.'

const DetailComment = ({ comment }) => {
    return (
        <div className="pl-3 card my-1">
            <div className="card-title">
                <UserDisplay user={comment.comment_by} includeFullName />
            </div>
            <div className="card-text">
                {comment.comment_content}
            </div>
        </div>
    )


}
export const TweetDetailComponent = (props) => {
    const tweetid = props.match.params.id
    const [didLookUp, setDidLookUp] = useState(false)
    const [tweet, setTweet] = useState(null)

    const handleBackendLoopUp = (response, status) => {
        if (status === 200) {
            setTweet(response)
            console.log(response)
        }
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

    return tweet === null ? null :
        <>
            <Tweet tweet={tweet} />
            {tweet.comments.map((comment, id) =>
                <DetailComment comment={comment} key={comment.id} />
            )}
        </>

}
