
import React, { useState } from 'react'
import { Route, Link } from 'react-router-dom'

import { TweetComponent } from '../tweets/components'
import { ProfileBadgeComponent, ProfileEditComponent } from '../profiles'
import { LogoutComponent, LoginComponent } from './Login'
import { NavBar, SideNav } from './components'

export const Grid = (props) => {
    const classname = props.grid
    return <div className={classname}>{props.children}</div>
}
export const Layout = (props) => {
    const [auth, setAuth] = useState(null)

    const handleAuth = (response) => {
        console.log(response)
        localStorage.setItem("signedIn", true)
        localStorage.setItem("token", response.token)
        localStorage.setItem("username_as", response.username)
        setAuth({ 'isAuthenticated': true, 'username': response.username })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Grid grid='col col-1' />
                <Grid grid="col col-2">
                    <SideNav {...props} />
                </Grid>
                <div className="col col-5 p-0 main_col">
                    <Route path="/" exact render={
                        () =>
                            <div>
                                <NavBar header='Tweetme' />
                                <TweetComponent />
                            </div>
                    } />

                    <Route path="/profile/:username" exact render={() =>
                        <div>
                            <ProfileBadgeComponent {...props} />
                        </div>
                    } />
                    <Route path="/profile/edit/:username" exact component={ProfileEditComponent} />
                    <Route path="/login/" exact render={() => <LoginComponent handleAuth={handleAuth} />} />
                    <Route path="/logout/" exact render={() => <LogoutComponent handleAuth={handleAuth} />} />

                </div>
                <div className="col col-3">Cards
                </div>
                <div className="col col-1">
                </div>

            </div>
        </div>
    )

}