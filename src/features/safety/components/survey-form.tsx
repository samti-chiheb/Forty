
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { logSafetyCheck } from "../actions"
import { Loader2 } from "lucide-react"
import React from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { SafetySurveySchema, calculateRiskLevel } from "../rules"
import { useSafety } from "../context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function SafetySurveyForm() {
  const { setSafe, setBlocked } = useSafety()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
  const form = useForm({
    resolver: zodResolver(SafetySurveySchema),
    defaultValues: {
      mood: 3,
      feeling: "",
      hallucinations: false,
      panicAttack: false,
      selfHarm: false,
      dissociation: false,
    },
  })

  async function onSubmit(values: z.infer<typeof SafetySurveySchema>) {
    setIsSubmitting(true)
    try {
      const risk = calculateRiskLevel(values)
      
      // Log to server
      await logSafetyCheck(values)

      if (risk === "CRITICAL") {
        setBlocked(risk)
      } else {
        setSafe(risk)
      }
    } catch (error) {
      console.error("Submission error", error)
      // Fallback: still process risk locally
      const risk = calculateRiskLevel(values)
      if (risk === "CRITICAL") setBlocked(risk)
      else setSafe(risk)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto"
    >
      <Card className="border-none shadow-2xl bg-card/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Check In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Mood Slider */}
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How are you feeling right now? (1-5)</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                      <span>Struggling</span>
                      <span>Okay</span>
                      <span>Great</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Feelings Text */}
              <FormField
                control={form.control}
                name="feeling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your mindset</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="I'm feeling anxious because..." 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Risk Factors (Grouped) */}
              <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
                <h4 className="text-sm font-medium leading-none">Safety Check</h4>
                <p className="text-xs text-muted-foreground">Please check any that apply right now:</p>
                
                <FormField
                  control={form.control}
                  name="panicAttack"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I am having a panic attack</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                 <FormField
                  control={form.control}
                  name="selfHarm"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I feel like hurting myself</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                 <FormField
                  control={form.control}
                  name="hallucinations"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I am seeing/hearing things others don't</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking Safety...
                  </>
                ) : (
                  "Enter Sanctuary"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
