
import { z } from 'zod'

export const RiskLevel = z.enum(['LOW', 'MODERATE', 'HIGH', 'CRITICAL'])
export type RiskLevel = z.infer<typeof RiskLevel>

// Core Safety Survey Schema
export const SafetySurveySchema = z.object({
  mood: z.number().min(1).max(5).describe("1=Worst, 5=Best"),
  feeling: z.string().min(1, "Please describe how you feel"),
  
  // Contraindications (Must trigger Block if true)
  hallucinations: z.boolean().default(false),
  panicAttack: z.boolean().default(false), // Acute panic
  selfHarm: z.boolean().default(false),    // Immediate risk
  dissociation: z.boolean().default(false)
})

export type SafetySurvey = z.infer<typeof SafetySurveySchema>

// Evaluates if a user should be blocked based on survey data
export const isContraindicated = (data: SafetySurvey): boolean => {
  return (
    data.hallucinations ||
    data.panicAttack ||
    data.selfHarm ||
    data.dissociation
  )
}

// Returns the risk level based on inputs
export const calculateRiskLevel = (data: SafetySurvey): RiskLevel => {
  if (isContraindicated(data)) return 'CRITICAL'
  if (data.mood <= 2) return 'HIGH'
  if (data.mood === 3) return 'MODERATE'
  return 'LOW'
}
