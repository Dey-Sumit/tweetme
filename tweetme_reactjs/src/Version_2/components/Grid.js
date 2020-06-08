import React from 'react'

export const Grid = (props) => {
    const classname = props.grid
    return <div className={classname}>{props.children}</div>
}