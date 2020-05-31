import React from 'react'
export const NavBar = ({ header }) => {
    let username = null
    const un = localStorage.getItem("username_as")
    console.log(un);
    if (un)
        username = un

    return (
        <>  <nav className="navbar main_nav_custom sticky-top">
            <div className="container-fluid ">
                <div className="navbar-header">
                    <h5 className="navbar-brand"> {header} </h5>
                </div>
                <strong className="navbar-text navbar-right mt-1 text-info">{username}</strong>
            </div>
        </nav>
        </>
    )
}