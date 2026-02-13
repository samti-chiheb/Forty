
import { createClient } from "@/lib/supabase/server"
import { LogsTable, SafetyLog } from "@/features/admin/components/logs-table"
import { AnalyticsDashboard } from "@/features/admin/components/charts/dashboard"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()

  // 1. Check Auth (MVP: Just need to be logged in)
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login") 
  }

  // 2. Fetch Logs (Increased limit for better analytics)
  const { data: logs, error } = await supabase
    .from("safety_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100) // Fetch last 100 for decent sample size

  if (error) {
    console.error("Error fetching logs:", error)
    return <div className="p-8 text-destructive">Failed to load logs.</div>
  }

  const typedLogs = (logs || []) as unknown as SafetyLog[]

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Clinical Dashboard</h1>
      <p className="text-muted-foreground mb-8">Overview of patient safety and trends.</p>

      {/* Analytics Section */}
      <AnalyticsDashboard logs={typedLogs} />

      {/* Logs Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <LogsTable logs={typedLogs} />
      </div>
    </div>
  )
}
