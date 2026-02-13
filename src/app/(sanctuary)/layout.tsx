
import { SafetyProvider } from "@/features/safety/context"
import { SafetyGate } from "@/features/safety/components/gate"

export default function SanctuaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SafetyProvider>
      <SafetyGate>
        {children}
      </SafetyGate>
    </SafetyProvider>
  )
}
