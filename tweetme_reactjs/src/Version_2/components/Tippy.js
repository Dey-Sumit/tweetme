import React from 'react'
import { UserDisplay } from '../../profiles'

export const TippyComponent = ({ user }) => {
    return (
        <div className='p-3  border-0'>
            <img src={user.profilePicture} alt="..." className="rounded_small_image mr-3 " />
            <UserDisplay user={user} includeFullName />
            <p className='mt-2'>{user.bio}</p>
            <div>
                <span className="mr-2" >Followers:{user.follower_count} </span>
                <span >FOllowing:{user.following_count}</span>
            </div>
        </div>
    )
}