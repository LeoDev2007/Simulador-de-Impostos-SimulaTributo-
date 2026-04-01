import { createContext, useState, useContext } from "react"
import { calculateIPVA, type IPVAInput, type IPVAResult } from "../utils/IPVA"
import { type ResultWithDate } from "../utils/Tax"
import { useActiveTax } from "./ActiveTaxContext"
import { useHistory } from "./HistoryContext"

export type ResultIPVAWithData = ResultWithDate<IPVAResult, 'IPVA'>

type IPVAContextType = {
  calculateIPVA: (data: IPVAInput) => IPVAResult
  resultIPVA: ResultIPVAWithData | null
  saveResultIPVA: (res: IPVAResult) => void
}

const IPVAContext = createContext<IPVAContextType | null>(null)

export function IPVAProvider({ children }: { children: React.ReactNode }) {
  const { setLastCalculation } = useActiveTax()
  const { addToHistory } = useHistory()
  const [resultIPVA, setResultIPVA] = useState<ResultIPVAWithData | null>(null)

  const saveResultIPVA = (result: IPVAResult) => {
    const resultData: ResultIPVAWithData = {
      ...result,
      dateOfItem: new Date().toISOString(),
      type: "IPVA",
    }

    setLastCalculation("IPVA")
    addToHistory(resultData)
    setResultIPVA(resultData)
  }

  return (
    <IPVAContext.Provider value={{ calculateIPVA, resultIPVA, saveResultIPVA }}>
      {children}
    </IPVAContext.Provider>
  )
}

export function useIPVA() {
  const context = useContext(IPVAContext)
  if (!context) throw new Error("useIPVA must be used within IPVAProvider")
  return context
}