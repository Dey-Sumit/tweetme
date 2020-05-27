import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'
import { TweetComponent } from '../tweets/components'

const Card = (props) => {
    var classname = `card text-white ${props.bg} mb-3 mr-4`
    return (
        <div className={classname}>
            <div className="card-header">Header</div>
            <div className="card-body">
                <h5 className="card-title">Primary card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    )
}
const NavBar = ({ username }) => {
    return (
        <nav className="navbar navbar-dark bg-dark sticky-top">
            <div className="container-fluid ">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">Tweetme</a>
                </div>
                <p className="navbar-text navbar-right"><a href="#" className="navbar-link">{username}</a></p>
            </div>
        </nav>

    )
}
const SideNav = ({ username, name, icon, link }) => {
    const handleProfile = (event) => {
        event.preventDefault()
        window.location.href = `/profile/${username}`
        const tweetmeElement = document.getElementById("main-div")
        console.log(tweetmeElement)
        //tweetmeElement.className = 'd-none'

    }
    return (
        <nav className="navbar navbar-dark d-flex flex-column position-fixed ml-4 navbar_side_custom">
            <a className="navbar-brand" href=""><h3>Tweetme</h3></a>
            <div id="navbarsExampleDefault">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link btn" href="" onClick={handleProfile}><h4><FontAwesomeIcon icon={faUser} /> Profile</h4></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><h4>Explore</h4></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><h4>Bookmarks</h4></a>
                    </li>
                </ul>
            </div>
        </nav>
    )

}


export const Home = (props) => {
    console.log(props);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col col-lg-3">
                    <SideNav username={props.username} />
                </div>
                <div id="main-div" className="col col-lg-6">
                    <NavBar username={props.username} />
                    <TweetComponent {...props} /></div>
                <div className="col col-lg-3 pt-4">
                    <div className="position-fixed">
                        <Card bg='bg-success' />
                        <Card bg='bg-primary' />
                        <Card bg='bg-danger' />
                    </div>
                </div>
            </div>
        </div>
    )
}