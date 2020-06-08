import React from 'react'
export const InputField = ({ grid, id, type, dValue, reference, required }) => {
    grid = `form-group ${grid}`
    return (
        <div className={grid}>
            <label htmlFor={id}>{id}</label>
            <input type={type} className="form-control"
                defaultValue={dValue} id={id} ref={reference} required />
        </div>

    )
}
