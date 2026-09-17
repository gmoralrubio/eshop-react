import type { AccessToken } from '@features/Auth/types/auth.type'
import type { User } from '@features/Auth/types/user.type'
import { parseErrorResponse } from '@shared/utils/error.utils'

const API_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL
export const authRepository = {
	loginUser: async (
		email: string,
		password: string
	): Promise<AccessToken> => {
		const API_URL = `${API_BASE_URL}/login`

		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				username: email,
				password,
			}),
		})

		if (!response.ok) {
			await parseErrorResponse(response, 'Login failed. Please check your credentials.')
		}

		const token: AccessToken = await response.json()
		return token
	},

	createUser: async (email: string, password: string) => {
		const API_URL = `${API_BASE_URL}/register`

		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				username: email,
				password,
			}),
		})

		if (!response.ok) {
			await parseErrorResponse(response, 'Signup failed.')
		}

		const data = await response.json()
		return data
	},

	getUserInfo: async (token: string): Promise<User> => {
		const API_URL = `${API_BASE_URL}/me`

		if (!token) {
			throw new Error('Invalid token or not found')
		}

		const response = await fetch(API_URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			await parseErrorResponse(response, 'Error getting user info')
		}
		const user = await response.json()
		return user
	},
}
