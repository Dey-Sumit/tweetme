
import React from 'react'


export const UserPicture = ({ user }) => {
    return <UserLink user={user}>
        <span className="px-4 py-2 rounded-circle border text-center bg-secondary" style={{ 'fontSize': '40px' }}>
            {user.username[0]}
        </span>
    </UserLink>
}

export const UserLink = (props) => {
    const { user } = props
    const handleUserLink = (event) => {
        window.location.pathname = `/profile/${user.username}`
    }
    return <span className='pointer' onClick={handleUserLink}>{props.children}</span>
}

export const UserDisplay = ({ user, includeFullName, hidelink }) => {
    const fullName = includeFullName === true ? `${user.first_name} ${user.last_name}` : null
    return <React.Fragment>
        {fullName}{" "}
        {hidelink === true ? `@${user.username}` : <UserLink user={user}>@{user.username}</UserLink>}
    </React.Fragment>
}
