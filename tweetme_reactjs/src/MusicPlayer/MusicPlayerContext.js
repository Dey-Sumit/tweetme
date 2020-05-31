import React, { useState } from 'react'

// create a context
// make a provider component to provide the context to it's child

//consume it by useContext(Context) in a component

const MusicPlayerContext = React.createContext([{}, () => { }]);

const MusicPlayerProvider = (props) => {
    const [state, setState] = useState({
        tracks: [
            {
                name: 'Mad World',
            },
            {
                name: 'Sugar',
            },
            {
                name: 'Demon',
            }
        ]
    })
    return (
        <MusicPlayerContext.Provider value={[state, setState]}>
            {props.children}
        </MusicPlayerContext.Provider>
    )
}

export { MusicPlayerContext, MusicPlayerProvider };