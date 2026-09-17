import type { User } from '@features/Auth/types/user.type'

export interface AuthState {
	user: User | null
	isLoading: boolean
	error: string | null
}

export interface AuthContextType {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean
	error: string | null
	login: (email: string, password: string) => Promise<boolean>
	logout: () => void
	signup: (email: string, password: string) => Promise<void>

	checkAuth: () => Promise<void>
}

export interface AccessToken {
	accessToken: string
}
