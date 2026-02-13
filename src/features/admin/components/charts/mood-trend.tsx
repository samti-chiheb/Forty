
"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface MoodData {
  date: string
  averageMood: number
  count: number
}

interface MoodTrendChartProps {
  data: MoodData[]
}

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Mood Trends (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[240px] w-full">
           {data.length > 0 ? (
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]}
                />
                <Tooltip 
                   contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                   itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line
                  type="monotone"
                  dataKey="averageMood"
                  stroke="#0f766e" // Teal-700
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: "#0f766e" }}
                  dot={{ r: 4, fill: "#0f766e", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
           ) : (
             <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
               Not enough data to display trends.
             </div>
           )}
        </div>
      </CardContent>
    </Card>
  )
}
