import React, { createContext, useState, useContext, useEffect } from 'react'

const AudioContext = createContext()

const initialState = {
  songs: {
    mainTheme: '/assets/sounds/music/loop_standard.ogg',
    technoTheme1: '/assets/sounds/music/loop_techno_1.ogg',
    technoTheme2: '/assets/sounds/music/loop_techno_2.ogg',
    mysteryTheme: '/assets/sounds/music/loop_mystery.ogg',
    guitarTheme: '/assets/sounds/music/loop_guitar.ogg',
    endingTheme: '/assets/sounds/music/ending.ogg'
  },
  soundEffects: {
    diamondCollect: '/assets/sounds/collectables/DiamondCollected.wav',
    ctmSound: '/assets/sounds/catActions/ctm.wav',
    damage: '/assets/sounds/catActions/damage.wav',
    heal: '/assets/sounds/catActions/heal.wav',
    shutterSound: '/assets/sounds/catActions/shutter.wav',
    catAttackSound: '/assets/sounds/catActions/catAttack.wav'
  }
}

export const AudioProvider = ({ children }) => {
  const [sounds] = useState(initialState)

  const [musicAudio, setMusicAudio] = useState(null)
  const [musicVolume, setMusicVolume] = useState(1)

  const [currentSong, setCurrentSong] = useState(null)
  const [soundEffectInstances, setSoundEffectInstances] = useState({})
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(1)

  const fadeDuration = 500

  useEffect(() => {
    const instances = {}
    Object.keys(sounds.soundEffects).forEach((key) => {
      instances[key] = new Audio(sounds.soundEffects[key])
    })
    setSoundEffectInstances(instances)
  }, [sounds.soundEffects])

  const fadeOut = async (audio) => {
    return new Promise((resolve) => {
      let volume = audio.volume
      const fadeStep = volume / (fadeDuration / 50)

      const interval = setInterval(() => {
        volume = Math.max(volume - fadeStep, 0)
        audio.volume = volume
        if (volume <= 0) {
          audio.pause()
          clearInterval(interval)
          resolve()
        }
      }, 50)
    })
  }

  const fadeIn = (audio) => {
    let volume = 0
    audio.volume = volume
    const fadeStep = musicVolume / (fadeDuration / 50)

    const interval = setInterval(() => {
      volume = Math.min(volume + fadeStep, musicVolume)
      audio.volume = volume
      if (volume >= musicVolume) {
        clearInterval(interval)
      }
    }, 50)
  }

  const playMusic = async (songKey) => {
    try {
      if (currentSong === songKey) return

      if (musicAudio) {
        await fadeOut(musicAudio)
      }

      const newAudio = new Audio(sounds.songs[songKey])
      newAudio.loop = true
      newAudio.volume = 0
      newAudio.play().then(() => {
        fadeIn(newAudio)
        setMusicAudio(newAudio)
        setCurrentSong(songKey)
      })
    } catch (error) {
      console.error('Error playing music:', error)
    }
  }

  const playSoundEffect = (soundKey) => {
    try {
      if (soundEffectInstances[soundKey]) {
        const audio = soundEffectInstances[soundKey].cloneNode()
        audio.volume = soundEffectsVolume
        audio.play()
      }
    } catch (error) {
      console.error('Error playing sound effect:', error)
    }
  }

  const setMusicVolumeLevel = (volume) => {
    setMusicVolume(volume)
    if (musicAudio) {
      musicAudio.volume = volume
    }
  }

  const setSoundEffectsVolumeLevel = (volume) => {
    setSoundEffectsVolume(volume)
  }

  const stopAllSounds = () => {
    if (musicAudio) {
      musicAudio.pause()
      setMusicAudio(null)
      setCurrentSong(null)
    }
  }

  const muteAll = () => {
    setMusicVolumeLevel(0)
    setSoundEffectsVolumeLevel(0)
  }

  const unmuteAll = () => {
    setMusicVolumeLevel(1)
    setSoundEffectsVolumeLevel(1)
  }

  console.log({
    currentSong,
    musicVolume,
    soundEffectsVolume
  })

  return (
    <AudioContext.Provider
      value={{
        playMusic,
        playSoundEffect,
        setMusicVolumeLevel,
        setSoundEffectsVolumeLevel,
        stopAllSounds,
        muteAll,
        unmuteAll
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
