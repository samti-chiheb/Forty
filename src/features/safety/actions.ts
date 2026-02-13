
"use server"

import { createClient } from "@/lib/supabase/server"
import { SafetySurveySchema, calculateRiskLevel, type SafetySurvey } from "./rules"

export async function logSafetyCheck(data: SafetySurvey) {
  const supabase = await createClient()
  const risk = calculateRiskLevel(data)
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
     // For MVP, we allow anonymous logging (or handle graceful fail)
     // Ideally, we require auth. But let's assume valid session for now.
     console.warn("No user found for logging safety check")
     return { success: false, error: "Unauthorized" }
  }

  const payload = {
    user_id: user.id,
    mood: data.mood,
    feeling: data.feeling,
    risk_level: risk,
    action_taken: risk === "CRITICAL" ? "BLOCKED" : "ALLOWED",
    metadata: {
      hallucinations: data.hallucinations,
      panicAttack: data.panicAttack,
      selfHarm: data.selfHarm,
      dissociation: data.dissociation,
    }
  }

  const { error } = await supabase.from("safety_logs").insert(payload)

  if (error) {
    console.error("Failed to log safety check:", error)
    return { success: false, error: error.message }
  }

  return { success: true, risk }
}
