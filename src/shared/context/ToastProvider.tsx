import { useState } from 'react'
import type { ReactNode } from 'react'
import { ToastContext } from './ToastContext'
import type { ToastMessage } from './ToastContext'

const AUTO_DISMISS_MS = 6000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const dismiss = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const addMessage = (text: string, type: 'error' | 'success', duration?: number) => {
    const id = Date.now()
    const resolvedDuration = duration ?? AUTO_DISMISS_MS
    setMessages((prev) => [...prev, { id, text, type, duration }])
    if (resolvedDuration > 0) {
      setTimeout(() => dismiss(id), resolvedDuration)
    }
  }

  const showError = (msg: string, duration?: number) => addMessage(msg, 'error', duration)
  const showSuccess = (msg: string, duration?: number) => addMessage(msg, 'success', duration)

  return (
    <ToastContext value={{ messages, showError, showSuccess, dismiss }}>
      {children}
    </ToastContext>
  )
}
