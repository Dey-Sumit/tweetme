import React, { useRef, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { InputField } from '../profiles/ProfileBadgeComponent.js'

export const LoginComponent = (props) => {
    const { handleAuth } = props
    const user_name_ref = useRef()
    const password_ref = useRef()

    const [error, setError] = useState(null)
    const [Authenticated, setAuthenticated] = useState(false)


    const handleErrors = (response) => {
        if (!response.ok) {
            console.log("Error:chcek credentials");
            setError("no user exists at this credential")
        }
        else {
            setError(null)
            return response.json()
        }
    }

    const handleDidSubmit = (event) => {
        event.preventDefault()
        const usname = user_name_ref.current.value
        const pass = password_ref.current.value
        const data = {
            username: usname,
            password: pass
        }
        console.log(data);

        //call
        fetch('http://localhost:8000/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => handleErrors(res))
            .then(res => {
                setAuthenticated(res)
                handleAuth(res)
            })
            .catch(error => console.log(error));
    }
    return (
        Authenticated ? <Redirect to='/' /> :
            <div>
                <form onSubmit={handleDidSubmit}>
                    <div className="form-group col-md-6">
                        <InputField id='Username' type="text" dValue='' reference={user_name_ref} />
                    </div>
                    <div className="form-group col-md-6">
                        <InputField id='Password Name' type="text" dValue='' reference={password_ref} />
                    </div>
                    <button className='btn btn-primary' >Login</button>
                </form>
                {error && <div className=" mt-2 alert alert-danger" role="alert">
                    {error}
                </div>}
            </div>
    )

}

export const LogoutComponent = (props) => {
    const [auth, setAuth] = useState(true)
    const handleLogout = () => {
        localStorage.clear()
        setAuth(false)
    }
    return auth === true ? (
        <div className="card">
            <div className="card-body flex-column text-center">
                <h5 className="card-title">Log Out screen</h5>
                <p className="card-text"> are you sure you want to log out?</p>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>

            </div>
        </div>
    ) : <Redirect to='/login/' />

}