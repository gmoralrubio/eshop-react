import { AuthContext } from '@features/Auth/context/AuthContext'
import { authRepository } from '@features/Auth/services/authRepository'
import type { AuthState } from '@features/Auth/types/auth.type'
import { useState, useEffect } from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    checkAuth().catch(() => {})
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, error: null, isLoading: true }))
    try {
      const token = await authRepository.loginUser(email, password)
      const user = await authRepository.getUserInfo(token.accessToken)
      localStorage.setItem('accessToken', token.accessToken)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
        user,
      }))
      return true
    } catch (error: unknown) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }))
      return false
    }
  }

  const logout = () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      user: null,
    }))
    localStorage.removeItem('accessToken')
    setState(() => ({
      error: null,
      isLoading: false,
      user: null,
    }))
  }

  const signup = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      await authRepository.createUser(email, password)
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    } catch (error: unknown) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }))
      throw error
    }
  }

  const checkAuth = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }))
        return
      }
      const user = await authRepository.getUserInfo(token)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        user,
      }))
    } catch {
      localStorage.removeItem('accessToken')
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    }
  }

  return (
    <AuthContext
      value={{
        user: state.user,
        isAuthenticated: state.user !== null,
        isLoading: state.isLoading,
        error: state.error,
        login,
        logout,
        signup,
        checkAuth,
      }}
    >
      {children}
    </AuthContext>
  )
}
