
export type Category = 'All' | 'Nature' | 'Focus' | 'Breathing'

export interface Track {
  id: string
  title: string
  artist: string
  src: string
  category: Category
  duration?: string // Display string like "5:00"
}

export const LIBRARY: Track[] = [
  // Nature
  {
    id: "1",
    title: "Rainforest Ambient",
    artist: "Nature Sounds",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    category: "Nature",
    duration: "6:12"
  },
  {
    id: "2",
    title: "Ocean Waves",
    artist: "Coastal Vibes",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    category: "Nature",
    duration: "7:05"
  },
  
  // Focus
  {
    id: "3",
    title: "Deep Work Flow",
    artist: "Brain Wave",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    category: "Focus",
    duration: "5:44"
  },
  {
    id: "4",
    title: "Binaural Beats (Alpha)",
    artist: "Mindful Hertz",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    category: "Focus",
    duration: "5:02"
  },

  // Breathing
  {
    id: "5",
    title: "4-7-8 Breathing Guide",
    artist: "Wellness Coach",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", // Placeholder
    category: "Breathing",
    duration: "4:30"
  },
  {
    id: "6",
    title: "Box Breathing",
    artist: "Dr. Calm",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", // Placeholder
    category: "Breathing",
    duration: "3:15"
  }
]
