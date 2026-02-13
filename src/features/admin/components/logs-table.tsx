
"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export interface SafetyLog {
  id: string
  user_id: string
  mood: number
  feeling: string | null
  risk_level: string
  action_taken: string
  created_at: string
}

interface LogsTableProps {
  logs: SafetyLog[]
}

export function LogsTable({ logs }: LogsTableProps) {
  if (!logs?.length) {
    return <div className="text-center p-8 text-muted-foreground">No logs found.</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Mood (1-5)</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Action</TableHead>
            <TableHead className="w-[300px]">Feeling</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">
                {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell>{log.mood}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    log.risk_level === "CRITICAL" ? "destructive" : 
                    log.risk_level === "HIGH" ? "destructive" : 
                    log.risk_level === "MODERATE" ? "secondary" : "default" // "default" usually black/primary, safely for LOW
                  }
                  className={log.risk_level === "LOW" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {log.risk_level}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                   {log.action_taken === "BLOCKED" ? (
                     <span className="text-red-500 font-bold">BLOCKED</span>
                   ) : (
                     <span className="text-green-600">Allowed</span>
                   )}
                </div>
              </TableCell>
              <TableCell className="max-w-[300px] truncate" title={log.feeling || ""}>
                {log.feeling || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
