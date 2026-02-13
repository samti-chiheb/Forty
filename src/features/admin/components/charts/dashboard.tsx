
import { SafetyLog } from "../logs-table"
import { MoodTrendChart, MoodData } from "./mood-trend"
import { RiskDistributionChart, RiskData } from "./risk-distribution"
import { format, subDays, startOfDay } from "date-fns"

interface AnalyticsProps {
  logs: SafetyLog[]
}

export function AnalyticsDashboard({ logs }: AnalyticsProps) {

  // Process Logs for Mood Trend (Last 7 Days)
  const processMoodTrends = (): MoodData[] => {
    const today = startOfDay(new Date())
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = subDays(today, 6 - i) // 6 days ago -> today
      return {
        date: format(d, "MMM dd"),
        rawDate: d.getTime(), 
        totalMood: 0,
        count: 0
      }
    })

    logs.forEach(log => {
      const logDate = startOfDay(new Date(log.created_at)).getTime()
      const dayData = last7Days.find(d => d.rawDate === logDate)
      
      if (dayData) {
        dayData.totalMood += log.mood
        dayData.count += 1
      }
    })

    return last7Days.map(d => ({
      date: d.date,
      count: d.count,
      averageMood: d.count > 0 ? Number((d.totalMood / d.count).toFixed(1)) : 0
    }))
  }

  // Process Logs for Risk Distribution
  const processRiskDistribution = (): RiskData[] => {
    const counts = { LOW: 0, MODERATE: 0, HIGH: 0, CRITICAL: 0 }

    logs.forEach(log => {
      const risk = log.risk_level as keyof typeof counts
      if (counts[risk] !== undefined) {
        counts[risk]++
      }
    })

    return Object.entries(counts)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({ name, value }))
  }

  const moodData = processMoodTrends()
  const riskData = processRiskDistribution()

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      {/* Mood Trend (Takes 2 columns) */}
      <MoodTrendChart data={moodData} />
      
      {/* Risk Dist (Takes 1 column) */}
      <div className="col-span-1">
        <RiskDistributionChart data={riskData} />
      </div>
    </div>
  )
}
