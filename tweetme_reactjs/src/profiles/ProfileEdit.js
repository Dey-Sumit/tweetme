import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import { InputField } from '../Version_2/components'



//uncontrolled form
export const ProfileEditComponent = (props) => {
    //console.log(props.match.params);
    const username = props.match.params.username
    var first_name_ref, last_name_ref, email_ref, bio_ref, location_ref, image_ref;
    first_name_ref = useRef()
    last_name_ref = useRef()
    email_ref = useRef()
    bio_ref = useRef()
    location_ref = useRef()
    image_ref = useRef()

    const [profile, setProfile] = useState(null)
    const [didLookUp, setDidLookUp] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        (async () => {
            const resp = await fetch('http://localhost:8000/api/profiles/sumax/');
            const jsonData = await resp.json();
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
                setUpdate(true)


            })
            .catch(err => console.log(err))
    };

    const onChangeFileHandler = (event) => {
        let file = event.target.files[0]
        setImageFile(file)
    }
    return (
        !update ? (
            profile &&
            <form className='mt-4 px-3' onSubmit={handleSubmit}>
                <div className="form-row">
                    <InputField grid='col-md-6' id='First Name' type="text" dValue={profile.first_name} reference={first_name_ref} />
                    <InputField id='Last Name' type="text" dValue={profile.last_name} reference={last_name_ref} />
                </div>
                <InputField id='Email' type="email" dValue={profile.email} reference={email_ref} />
                <div className="form-row">
                    <InputField grid='col-md-6' id='Bio' type="text" dValue={profile.bio} reference={bio_ref} />
                    <InputField grid='col-md-6' id='Location' type="text" dValue={profile.location} reference={location_ref} />
                </div>
                <div>
                    <input type="file" onChange={onChangeFileHandler} reference={image_ref} required />
                </div>
                <button className='btn btn-info float-left mt-4' type="submit">Update</button>

            </form >
        ) : <Redirect to='/profile/:username' />

    )

}
