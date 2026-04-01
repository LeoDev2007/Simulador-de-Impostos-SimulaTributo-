import { createContext, useContext, useState } from "react"
import { calculateICMS, type ICMSInput, type ICMSResult } from "../utils/ICMS"
import { type ResultWithDate } from "../utils/Tax"
import { useActiveTax } from "./ActiveTaxContext"
import { useHistory } from "./HistoryContext"

export type ResultICMSWithData = ResultWithDate<ICMSResult, 'ICMS'>

type ICMSContextType = {
  calculateICMS: (data: ICMSInput) => ICMSResult
  resultICMS: ResultICMSWithData | null
  saveResultICMS: (res: ICMSResult) => void
}

const ICMSContext = createContext<ICMSContextType | null>(null)

export function ICMSProvider({ children }: { children: React.ReactNode }) {
  const { setLastCalculation } = useActiveTax()
  const { addToHistory } = useHistory()
  const [resultICMS, setResultICMS] = useState<ResultICMSWithData | null>(null)

  const saveResultICMS = (result: ICMSResult) => {
    const resultData: ResultICMSWithData = {
      ...result,
      dateOfItem: new Date().toISOString(),
      type: "ICMS",
    }

    setLastCalculation("ICMS")
    addToHistory(resultData)
    setResultICMS(resultData)
  }

  return (
    <ICMSContext.Provider value={{ calculateICMS, resultICMS, saveResultICMS }}>
      {children}
    </ICMSContext.Provider>
  )
}

export function useICMS() {
  const context = useContext(ICMSContext)
  if (!context) throw new Error("useICMS must be used within ICMSProvider")
  return context
}