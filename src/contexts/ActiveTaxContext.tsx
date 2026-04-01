import { createContext, useContext, useState } from "react"
import type { TaxType } from "../utils/Tax"

type ActiveTaxContextType = {
  lastCalculation: TaxType | null
  setLastCalculation: (type: TaxType) => void
}

const ActiveTaxContext = createContext<ActiveTaxContextType | null>(null)

export function ActiveTaxProvider({ children }: { children: React.ReactNode }) {
  const [lastCalculation, setLastCalculation] = useState<TaxType | null>(null)

  return (
    <ActiveTaxContext.Provider value={{ lastCalculation, setLastCalculation }}>
      {children}
    </ActiveTaxContext.Provider>
  )
}

export function useActiveTax() {
  const context = useContext(ActiveTaxContext)
  if (!context) throw new Error("useActiveTax must be used within ActiveTaxProvider")
  return context
}