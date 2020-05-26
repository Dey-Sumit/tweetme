import React, { useState, useEffect } from 'react'

import { apiProfileDetail, apiProfileFollowToggle } from '.'
import { UserDisplay, UserPicture } from '.'

//if the profile loading we dont wanna toggle it

const ProfileBadge = (props) => {
    const { profile, didFollowToggle, profileLoading } = props
    const actionVerb = (profile && profile.is_following) ? "unfollow" : "follow"
    const handleFollowToggle = (event) => {
        event.preventDefault()
        // if profile updates it's last state/action(may be for networking error,user clicks multople time) then only fire new action
        if (profileLoading === false) {
            console.log("follow toggle")
            didFollowToggle(actionVerb)
        }
    }
    return (
        <section className='aboutSection mt-5'>
            <div className="container">
                <div className="row align-item-center">
                    <div className="col-lg-9 mx-auto text-center flex">
                        <h3>Profile</h3>
                        {/* <img src="" class="rounded mx-auto d-block" alt="..."> */}
                        <p><UserDisplay user={profile} hidelink includeFullName /></p>
                        <p>{profile.bio}</p>
                        <p>{profile.location}</p>
                        <button className='btn'>Edit Profile</button>
                    </div>
                </div>
                <div className="counter bg-secondary ">
                    <div className="row col-md-9 py-4 mx-auto">
                        <div className="col-md-4 col-6 border">
                            <div className="text-center">
                                <h6> {profile.following_count} </h6>
                                <p>following</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 border">
                            <div className="text-center">
                                <h6> {profile.follower_count} </h6>
                                <button className='btn btn-primary' onClick={handleFollowToggle}>{actionVerb}</button>
                                <p>followers</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 border">
                            <div className="text-center ">
                                <h6> {profile.no_of_tweets} </h6>
                                <p>tweets</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export const ProfileBadgeComponent = (props) => {
    const { username } = props
    console.log(username)
    const [didLookUp, setDidLookUp] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)


    useEffect(() => {
        const handleProfileLookUp = (response, status) => {
            console.log(status, response);
            if (status === 200) {
                setProfile(response)
            }
        }
        if (didLookUp === false) {
            console.log("apiprfile called");

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

    return profile ? <ProfileBadge profile={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} /> : <h2>loading...</h2>
}
