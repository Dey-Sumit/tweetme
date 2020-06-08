import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiProfileDetail, apiProfileFollowToggle } from '.'
import { UserDisplay } from '.'
import { NavBar } from '../Version_2/components'
import { TweetList } from '../tweets'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//if the profile loading we dont wanna toggle it
const ProfileBadge = (props) => {
    const { profile } = props
    //const {profile, didFollowToggle, profileLoading} = props
    // const actionVerb = (profile && profile.is_following) ? "unfollow" : "follow"
    // const handleFollowToggle = (event) => {
    //     event.preventDefault()
    //     // if profile updates it's last state/action(may be for networking error,user clicks multople time) then only fire new action
    //     if (profileLoading === false) {
    //         console.log("follow toggle")
    //         didFollowToggle(actionVerb)
    //     }
    // }
    return (
        <div className="align-item-center">
            <NavBar header='Profile' content={`Tweets: ${profile.no_of_tweets}`} />
            <div className="text-center mt-3">
                <div className="coverPhoto">
                    <div className="card mb-3">
                        <div>
                            <img src={profile.profilePicture} className="card-img-top" alt="cover pic" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"><UserDisplay user={profile} hidelink includeFullName /></h5>
                            <p className="card-text">{profile.bio}</p>
                            <p className="card-text ">
                                <small className='float-left text-warning pt-2'>{profile.location}</small>
                                <em className="text-muted float-right">Last updated at {profile.last_updated}</em>
                            </p>
                        </div>
                        <div className="card-footer bg-transparent ">
                            <strong className="float-left text-info">Followers: {profile.follower_count}</strong>
                            <strong className="float-right text-info">Following: {profile.following_count}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="secondary_div d-flex justify-content-around pb-2 border_bottom_custom">
                <Link to={{ pathname: `/profile/edit/${profile.username}` }} className="btn btn-outline-primary" role="button" aria-pressed="true">Edit Profile</Link>
                <Link to={{ pathname: '/logout/' }} className="btn btn-outline-danger" role="button" aria-pressed="true"><FontAwesomeIcon icon={faSignOutAlt} />  Log Out</Link>
            </div>

        </div>
    )
}

export const ProfileBadgeComponent = (props) => {
    const username = localStorage.getItem('username_as')
    const [didLookUp, setDidLookUp] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)


    useEffect(() => {
        const handleProfileLookUp = (response, status) => {
            if (status === 200) {
                setProfile(response)
            }
        }
        if (didLookUp === false) {
            apiProfileDetail(username, handleProfileLookUp)
            setDidLookUp(true)
        }

    }, [username, didLookUp, setDidLookUp])

    const handleNewFollow = (actionVerb) => {
        console.log(actionVerb);
        // profile laoding =true; untill the asynchronous function ends
        apiProfileFollowToggle(username, actionVerb, (response, status) => {
            if (status === 200) {
                setProfile(response)
                console.log(response);
            }
            // async call ends , then make profileloading false
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }

    return profile ?
        <React.Fragment>
            <ProfileBadge profile={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} />
            <TweetList />
        </React.Fragment>
        : <h2 className="text-center">loading...</h2>
}
