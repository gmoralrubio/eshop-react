import type { AuthContextType } from '@features/Auth/types/auth.type'
import { createContext } from 'react'

export const AuthContext = createContext<AuthContextType | null>(null)
