import { createContext } from 'react'

export interface ToastMessage {
  id: number
  text: string
  type: 'error' | 'success'
  /** 0 = sticky (sin auto-dismiss), undefined = default 6000ms */
  duration?: number
}

interface ToastContextValue {
  messages: ToastMessage[]
  showError: (msg: string, duration?: number) => void
  showSuccess: (msg: string, duration?: number) => void
  dismiss: (id: number) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
