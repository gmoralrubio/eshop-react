import { ToastContext } from '@shared/context/ToastContext'
import { useContext } from 'react'

export function useToast() {
	const ctx = useContext(ToastContext)
	if (!ctx) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return { showError: ctx.showError, showSuccess: ctx.showSuccess, dismiss: ctx.dismiss }
}
