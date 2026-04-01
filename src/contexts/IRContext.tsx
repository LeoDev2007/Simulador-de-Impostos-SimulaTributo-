import { createContext, useContext, useState } from "react"
import { calculateINSS } from "../utils/INSS"
import { calculateIR, type IRInput, type IRResult } from "../utils/IR"
import { type ResultWithDate } from "../utils/Tax"
import { useActiveTax } from "./ActiveTaxContext"
import { useHistory } from "./HistoryContext"

export type ResultIRWithData = ResultWithDate<IRResult, 'IR'>

type IRContextType = {
    calculateINSS: (salary: number) => number
    calculateIR: (data: IRInput) => IRResult
    resultIR: ResultIRWithData | null
    saveResult: (res: IRResult) => void
}

const IRContext = createContext<IRContextType | null>(null)

export function IRProvider({ children }: { children: React.ReactNode }) {
    const { setLastCalculation } = useActiveTax()
    const { addToHistory } = useHistory()
    const [resultIR, setResultIR] = useState<ResultIRWithData | null>(null)

    const saveResult = (result: IRResult) => {
        const resultData: ResultIRWithData = {
            ...result,
            dateOfItem: new Date().toISOString(),
            type: 'IR'
        }

        setLastCalculation('IR')
        addToHistory(resultData)
        setResultIR(resultData)
    }

    return (
        <IRContext.Provider value={{ calculateINSS, calculateIR, resultIR, saveResult }}>
            {children}
        </IRContext.Provider>
    )
}

export function useIR() {
    const context = useContext(IRContext)
    if (!context) {
        throw new Error("useIR must be used within IRProvider")
    }
    return context
}