import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

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