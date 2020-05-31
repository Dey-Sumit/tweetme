import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { apiProfileDetail, apiProfileFollowToggle } from '.'
import { UserDisplay } from '.'
import { NavBar } from '../Version_2/components'
import { NavItem } from '../Version_2/components/SideNav'
import CoverPhoto from '../images/coverphoto_unsp.jpg'
import { TweetList } from '../tweets'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { api_fetch_profile_update } from '../Version_2/fetch_api/fetch_lookups'
import axios from 'axios';

export const InputField = ({ id, type, dValue, reference, required }) => {
    return (
        <React.Fragment>
            <label htmlFor={id}>{id}</label>
            <input type={type} className="form-control"
                defaultValue={dValue} id={id} ref={reference} required />
        </React.Fragment>
    )
}

//uncontrolled form
export const ProfileEditComponent = (props) => {
    //console.log(props.match.params);
    const username = props.match.params.username

    const first_name_ref = useRef()
    const last_name_ref = useRef()
    const email_ref = useRef()
    const bio_ref = useRef()
    const location_ref = useRef()
    const image_ref = useRef()

    const [profile, setProfile] = useState(null)
    const [didLookUp, setDidLookUp] = useState(false)
    const [imageFile, setImageFile] = useState(null)

    useEffect(() => {
        (async () => {
            const resp = await fetch('http://localhost:8000/api/profiles/sumax/');
            const jsonData = await resp.json();
            // console.log("profile-data ", jsonData);
            setProfile(jsonData)
        })();

    }, [didLookUp, setDidLookUp, username])

    const handleSubmit = (event) => {
        event.preventDefault()

        var form_data = new FormData()
        form_data.append('profilePicture', imageFile, imageFile.name)
        form_data.append('bio', bio_ref.current.value)
        form_data.append('email', email_ref.current.value)
        form_data.append('location', location_ref.current.value)
        form_data.append('first_name', first_name_ref.current.value)
        form_data.append('last_name', last_name_ref.current.value)
        let token = localStorage.getItem('token')
        token = ` Token ${token}`
        let url = 'http://localhost:8000/api/profiles/update/';
        axios({
            method: 'post',
            url: url,
            data: form_data,
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': token }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    };

    const onChangeFileHandler = (event) => {
        let file = event.target.files[0]
        setImageFile(file)
    }
    return (
        profile &&
        <form className='mt-4 px-3' onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <InputField id='First Name' type="text" dValue={profile.first_name} reference={first_name_ref} />
                </div>
                <div className="form-group col-md-6">
                    <InputField id='Last Name' type="text" dValue={profile.last_name} reference={last_name_ref} />
                </div>
            </div>
            <div className="form-group">
                <InputField id='Email' type="email" dValue='' reference={email_ref} />
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <InputField id='Bio' type="text" dValue={profile.bio} reference={bio_ref} />
                </div>
                <div className="form-group col-md-6">
                    <InputField id='Location' type="text" dValue={profile.location} reference={location_ref} />
                </div>
            </div>
            <div>
                <input type="file" onChange={onChangeFileHandler} reference={image_ref} />
            </div>
            <button className='btn btn-info float-left mt-4' type="submit">Submit</button>

        </form >

    )

}


const TweetListUtil = (props) => {

    return <TweetList {...props} />
}


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
                        <img src={profile.profilePicture} className="card-img-top" alt="cover pic" />
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
            <TweetListUtil {...props} />
        </React.Fragment>
        : <h2>loading...</h2>
}
