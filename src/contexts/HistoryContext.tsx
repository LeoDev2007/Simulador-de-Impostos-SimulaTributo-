import { createContext, useContext, useState } from "react"
import type { ResultIRWithData } from "./IRContext"
import type { ResultICMSWithData } from "./ICMSContext"
import type { ResultIPVAWithData } from "./IPVAContext"

const STORAGE_KEY = "general_history"
const MAX_HISTORY = 10

export type HistoryItem = ResultIRWithData | ResultICMSWithData | ResultIPVAWithData

type HistoryContextType = {
  history: HistoryItem[]
  addToHistory: (item: HistoryItem) => void
  cleanHistory: () => void
}

const HistoryContext = createContext<HistoryContextType | null>(null)

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const addToHistory = (item: HistoryItem) => {
    setHistory(prev => {
      const updated = [item, ...prev].slice(0, MAX_HISTORY)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const cleanHistory = () => {
    localStorage.removeItem(STORAGE_KEY)
    setHistory([])
  }

  return (
    <HistoryContext.Provider value={{ history, addToHistory, cleanHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (!context) throw new Error("useHistory must be used within HistoryProvider")
  return context
}