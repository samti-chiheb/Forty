
"use client"

import * as React from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useAudioEngine } from "../hooks/useAudioEngine"


import { useState, useEffect } from "react"
import { LIBRARY, Category, Track } from "../data/library"
import { cn } from "@/lib/utils"

export function Player() {
  const { isPlaying, progress, duration, track, playTrack, togglePlay, seek } = useAudioEngine()
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [isDragging, setIsDragging] = useState(false)
  const [sliderValue, setSliderValue] = useState([0])

  // Sync slider with progress when not dragging
  useEffect(() => {
    if (!isDragging) {
      setSliderValue([progress])
    }
  }, [progress, isDragging])

  const filteredTracks = activeCategory === 'All' 
    ? LIBRARY 
    : LIBRARY.filter(t => t.category === activeCategory)

  const handlePlay = (t = filteredTracks[0]) => {
    playTrack(t)
  }

  const handleSeek = (value: number[]) => {
    setSliderValue(value)
    seek(value[0])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const categories: Category[] = ['All', 'Nature', 'Focus', 'Breathing']

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-4">
      <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md">
        <CardContent className="flex flex-col items-center p-6 space-y-6">
          {/* Album Art / Visualizer Placeholder */}
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-600 shadow-lg flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-white/10 glass" />
             <Volume2 className="w-16 h-16 text-white/90 relative z-10" />
          </div>

          {/* Track Info */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground/90">
              {track?.title || "Select a Track"}
            </h2>
            <p className="text-muted-foreground font-medium">
              {track?.artist || "Sanctuary Library"}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <Slider
              value={sliderValue}
              max={duration || 100}
              step={1}
              className="cursor-pointer"
              onValueChange={(val) => {
                setIsDragging(true)
                setSliderValue(val)
              }}
              onValueCommit={(val) => {
                setIsDragging(false)
                handleSeek(val)
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900/30">
              <SkipBack className="w-6 h-6" />
            </Button>
            
            <Button 
              size="icon" 
              className="h-16 w-16 rounded-full shadow-xl hover:scale-105 transition-transform bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => track ? togglePlay() : handlePlay()}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </Button>

            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900/30">
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
              activeCategory === cat 
                ? "bg-teal-600 text-white shadow-md" 
                : "bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-muted-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Track List */}
      <div className="space-y-2 pb-20">
        <h3 className="text-sm font-semibold text-muted-foreground px-1 mb-2">
          {activeCategory === 'All' ? 'All Tracks' : `${activeCategory} Tracks`}
        </h3>
        {filteredTracks.map((t) => (
          <div 
            key={t.id}
            onClick={() => playTrack(t)}
            className={cn(
              "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border border-transparent",
              track?.id === t.id 
                ? "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800" 
                : "hover:bg-white/60 dark:hover:bg-slate-800/60"
            )}
          >
            <div className="flex flex-col">
              <span className={cn("text-sm font-medium", track?.id === t.id && "text-teal-700 dark:text-teal-300")}>
                {t.title}
              </span>
              <span className="text-xs text-muted-foreground">{t.artist}</span>
            </div>
            {track?.id === t.id && isPlaying && (
              <div className="flex gap-1 items-end h-3">
                <div className="w-1 bg-teal-500 animate-[bounce_1s_infinite] h-full" />
                <div className="w-1 bg-teal-500 animate-[bounce_1.2s_infinite] h-2/3" />
                <div className="w-1 bg-teal-500 animate-[bounce_0.8s_infinite] h-full" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

