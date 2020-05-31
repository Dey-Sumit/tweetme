import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHashtag, faBookmark, faFile, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const NavItem = ({ path, name, icon, color, btnType }) => {
    let classname = `nav-link btn ${color}`
    classname = btnType ? `btn ${btnType}` : classname
    console.log(classname);

    return (
        <li className="nav-item">
            <Link to={{ pathname: path }} className={classname}><h4><FontAwesomeIcon icon={icon} /><span>  </span>{name}</h4> </Link>
        </li>
    )
}
export const SideNav = ({ name, icon, link }) => {
    const username = localStorage.getItem("username_as")
    //console.log(username);

    return (
        <div className="d-flex flex-column position-fixed navbar_side_custom ">
            <Link to="/" className="navbar-brand text-info mb-4"><h3>Tweet_Me</h3> </Link>
            <div id="navbarsExampleDefault">
                <ul className="navbar-nav align-items-start">
                    <NavItem path={`/profile/${username}`} name='Profile' icon={faUser} color='text-info' />
                    <NavItem path='/global' name='Global' icon={faHashtag} color='text-info' />
                    <NavItem path='/bookmarks' name='Bookmarks' icon={faBookmark} color='text-info' />
                    <NavItem path='/documents' name='Docs' icon={faFile} color='text-warning' />
                    <NavItem path='/login/' name='Login' icon={faSignInAlt} btnType='btn-outline-info btn-sm mt-2' />

                </ul>
            </div>
        </div>
    )

}