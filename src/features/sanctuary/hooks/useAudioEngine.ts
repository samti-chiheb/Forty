
import { useState, useEffect, useRef, useCallback } from 'react'

import { LIBRARY, Track } from "../data/library"

interface AudioEngineState {
  isPlaying: boolean
  progress: number
  duration: number
  track: Track | null
}

export function useAudioEngine() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioEngineState>({
    isPlaying: false,
    progress: 0,
    duration: 0,
    track: null
  })

  // Initialize Audio Object
  useEffect(() => {
    audioRef.current = new Audio()
    
    const audio = audioRef.current

    const updateProgress = () => {
      setState(prev => ({ ...prev, progress: audio.currentTime }))
    }

    const updateDuration = () => {
      setState(prev => ({ ...prev, duration: audio.duration }))
    }
    
    const onEnded = () => {
       setState(prev => ({ ...prev, isPlaying: false, progress: 0 }))
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', onEnded)
      audio.pause()
    }
  }, [])

  const playTrack = useCallback(async (track: Track) => {
    if (!audioRef.current) return

    // If same track, just toggle
    if (state.track?.id === track.id) {
        togglePlay()
        return
    }

    try {
      audioRef.current.src = track.src
      audioRef.current.load()
      await audioRef.current.play()
      setState(prev => ({ ...prev, isPlaying: true, track }))
      
      // Update Media Session (Lock Screen)
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title,
          artist: track.artist || 'Sanctuary',
        })
        
        navigator.mediaSession.setActionHandler('play', () => audioRef.current?.play())
        navigator.mediaSession.setActionHandler('pause', () => audioRef.current?.pause())
      }

    } catch (error) {
      console.error("Playback failed", error)
    }
  }, [state.track])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return

    if (state.isPlaying) {
      audioRef.current.pause()
      setState(prev => ({ ...prev, isPlaying: false }))
    } else {
      audioRef.current.play()
      setState(prev => ({ ...prev, isPlaying: true }))
    }
  }, [state.isPlaying])

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setState(prev => ({ ...prev, progress: time }))
  }, [])

  return {
    ...state,
    playTrack,
    togglePlay,
    seek
  }
}
