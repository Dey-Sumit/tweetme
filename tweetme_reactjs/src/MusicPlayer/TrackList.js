import React, { useContext } from 'react'
import { useMusicPlayer } from './MusicPlayer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'


//consumer component
export const TrackList = (props) => {
    const { trackList, currentTrackName, playTrack, isPlaying } = useContext(useMusicPlayer) // got the latest state of MusicPlayerContext

    return (
        <>
            {trackList.map((track, index) => (
                <div className="col-8 border p-2">
                    <button className="btn btn-outline-info" onClick={() => playTrack(index)}>
                        {(currentTrackName === track.trackName && isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />)}
                    </button>
                    <div className="song-title">
                        {track.name}
                    </div>
                </div>
            ))}
        </>
    )
}