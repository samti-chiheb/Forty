
"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  noHover?: boolean
}

export function GlassCard({ children, className, noHover = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "glass rounded-2xl p-6",
        !noHover && "glass-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
