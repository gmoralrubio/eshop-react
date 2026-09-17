import { AuthContext } from '@features/Auth/context/AuthContext'
import { use } from 'react'

export function useAuth() {
	const context = use(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}
