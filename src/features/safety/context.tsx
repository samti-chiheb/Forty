
"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { RiskLevel } from "./rules"

type SafetyStatus = "IDLE" | "SAFE" | "BLOCKED"

interface SafetyContextType {
  status: SafetyStatus
  riskLevel: RiskLevel | null
  setSafe: (level: RiskLevel) => void
  setBlocked: (level: RiskLevel) => void
  reset: () => void
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined)

export function SafetyProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SafetyStatus>("IDLE")
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null)

  // Load from localStorage on mount (Simulated Persistence)
  useEffect(() => {
    const storedStatus = localStorage.getItem("hello-safety-status") as SafetyStatus
    const storedTime = localStorage.getItem("hello-safety-timestamp")
    
    if (storedStatus && storedTime) {
      const hoursPassed = (Date.now() - parseInt(storedTime)) / (1000 * 60 * 60)
      if (hoursPassed < 4) { // 4 Hour Session
        setStatus(storedStatus)
      } else {
        localStorage.removeItem("hello-safety-status")
        localStorage.removeItem("hello-safety-timestamp")
      }
    }
  }, [])

  const setSafe = (level: RiskLevel) => {
    setStatus("SAFE")
    setRiskLevel(level)
    localStorage.setItem("hello-safety-status", "SAFE")
    localStorage.setItem("hello-safety-timestamp", Date.now().toString())
  }

  const setBlocked = (level: RiskLevel) => {
    setStatus("BLOCKED")
    setRiskLevel(level)
    localStorage.setItem("hello-safety-status", "BLOCKED")
    localStorage.setItem("hello-safety-timestamp", Date.now().toString())
  }

  const reset = () => {
    setStatus("IDLE")
    setRiskLevel(null)
    localStorage.removeItem("hello-safety-status")
    localStorage.removeItem("hello-safety-timestamp")
  }

  return (
    <SafetyContext.Provider value={{ status, riskLevel, setSafe, setBlocked, reset }}>
      {children}
    </SafetyContext.Provider>
  )
}

export function useSafety() {
  const context = useContext(SafetyContext)
  if (context === undefined) {
    throw new Error("useSafety must be used within a SafetyProvider")
  }
  return context
}
