
"use client"

import { useSafety } from "../context"
import { SafetySurveyForm } from "./survey-form"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone } from "lucide-react"

export function SafetyGate({ children }: { children: React.ReactNode }) {
  const { status, reset } = useSafety()

  if (status === "IDLE") {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
        <SafetySurveyForm />
      </div>
    )
  }

  if (status === "BLOCKED") {
    return (
      <div className="fixed inset-0 z-50 bg-destructive/10 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-8">
        <div className="bg-background p-8 rounded-xl shadow-2xl max-w-md w-full border-red-200 border">
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-destructive mb-2">Safety Pause</h2>
          <p className="text-muted-foreground mb-6">
            It sounds like you're going through a tough moment that needs human support. The Sanctuary is for mild anxiety, not crisis.
          </p>
          
          <div className="space-y-4">
            <Button variant="destructive" className="w-full h-14 text-lg gap-2" asChild>
              <a href="tel:988">
                <Phone className="w-5 h-5" /> Call 988 (Lifeline)
              </a>
            </Button>
            <Button variant="outline" className="w-full" onClick={reset}>
              I made a mistake (Reset)
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
