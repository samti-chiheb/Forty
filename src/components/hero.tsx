
"use client"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowRight, ShieldCheck, WifiOff } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Background Ambient Animation */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute -z-10 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="z-10 container max-w-4xl mx-auto text-center space-y-8">
        
        {/* Badge */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Clinically Supported Safety
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white text-balance"
        >
          Your Digital <span className="text-teal-600 dark:text-teal-400">Sanctuary</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
        >
          Instant anxiety relief, available offline. A safe space to breathe, reflect, and stabilize when the world gets too loud.
        </motion.p>

        {/* CTA Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-900/20 transition-all hover:scale-105" asChild>
            <Link href="/sanctuary">
              Enter Sanctuary <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <WifiOff className="w-4 h-4" />
            <span>Works Offline</span>
          </div>
        </motion.div>

        {/* Feature Cards Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-left">
          <GlassCard className="p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h3 className="font-semibold text-lg mb-2 text-teal-700 dark:text-teal-300">Offline First</h3>
            <p className="text-sm text-muted-foreground">Access your calming tools anywhere, even without an internet connection.</p>
          </GlassCard>
           <GlassCard className="p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h3 className="font-semibold text-lg mb-2 text-teal-700 dark:text-teal-300">Safety Check</h3>
            <p className="text-sm text-muted-foreground">A gentle clinical gate ensures you get the right support for your current state.</p>
          </GlassCard>
           <GlassCard className="p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <h3 className="font-semibold text-lg mb-2 text-teal-700 dark:text-teal-300">Private Logs</h3>
            <p className="text-sm text-muted-foreground">Track your mood and safety status securely over time.</p>
          </GlassCard>
        </div>

      </div>
    </section>
  )
}
