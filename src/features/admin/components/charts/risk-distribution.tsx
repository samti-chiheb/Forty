
"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface RiskData {
  name: string
  value: number
}

interface RiskDistributionChartProps {
  data: RiskData[]
}

const COLORS = {
  LOW: "#22c55e", // Green-500
  MODERATE: "#eab308", // Yellow-500
  HIGH: "#f97316", // Orange-500
  CRITICAL: "#ef4444", // Red-500
}

export function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
           {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.name as keyof typeof COLORS] || "#8884d8"}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                   itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend 
                   verticalAlign="bottom" 
                   height={36}
                   iconType="circle"
                   wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
           ) : (
             <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
               No data available.
             </div>
           )}
        </div>
      </CardContent>
    </Card>
  )
}
