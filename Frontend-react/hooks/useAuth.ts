"use client"

import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  })

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token")
      const userString = await AsyncStorage.getItem("user_data")

      if (token && userString) {
        const user = JSON.parse(userString)
        setAuthState({
          isAuthenticated: true,
          user,
          token,
          loading: false,
        })
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
        })
      }
    } catch (error) {
      console.error("Error checking auth state:", error)
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      })
    }
  }

  const loginUser = async (token: string, user: User) => {
    try {
      await AsyncStorage.setItem("auth_token", token)
      await AsyncStorage.setItem("user_data", JSON.stringify(user))
      setAuthState({
        isAuthenticated: true,
        user,
        token,
        loading: false,
      })
    } catch (error) {
      console.error("Error storing auth data:", error)
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("auth_token")
      await AsyncStorage.removeItem("user_data")
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      })
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return {
    ...authState,
    loginUser,
    logout,
    checkAuthState,
  }
}
