import React, { useState, useContext } from 'react'

import { MusicPlayerContext } from './MusicPlayerContext'

//custom context hook
export const useMusicPlayer = () => {
    const [state, setState] = useContext(MusicPlayerContext)

    const playTrack = (index) => {
        if (index === state.currentTrackIndex)
            togglePlay()
        else
            setState(state => ({ ...state, currentTrackIndex: index, isPlaying: true }))
    }

    const togglePlay = () => {
        setState(state = ({ ...state, isPlaying: !state.isPlaying }))
    }
    const playPreviousTrack = () => {
        const newIndex = ((state.currentTrackIndex - 1) % state.tracks.length + state.tracks.length) % state.tracks.length
        playTrack(newIndex)
    }
    const playNextTrack = () => {
        const newIndex = (state.currentTrackIndex + 1) % state.tracks.length
        playTrack(newIndex)
    }
    return {
        playTrack,
        togglePlay,
        playNextTrack,
        playPreviousTrack,
        trackList: state.tracks,
        currenTrackName: state.currentTrackIndex != null && state.tracks[state.currentTrackIndex].name,
        isPlaying: state.isPlaying
    }





}
