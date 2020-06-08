import React, { useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { InputField } from '../components'

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

