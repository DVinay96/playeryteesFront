'use client'

import { create } from 'zustand'
import axios from 'axios'
import axiosInstance from '@/lib/axios'

interface RegisterState {
  //state
  isLoading: boolean
  error: string | null
  success: boolean
  // actions
  register: (
    name: string,
    username: string,
    email: string,
    password: string,
    phone_number: string
  ) => Promise<void>
  clearError: () => void
  reset: () => void
  //validations
  isPasswordValid: (password: string) => boolean
  isEmailValid: (email: string) => boolean
  isPhoneValid: (phone_number: string) => boolean
}

export const useRegisterStore = create<RegisterState>((set) => ({
  // Initial State
  isLoading: false,
  error: null,
  success: false,

  // Actions
  register: async (
    name: string,
    username: string,
    email: string,
    password: string,
    phone_number: string
  ) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.post('/auth/register', {
        name,
        username,
        email,
        password,
        phone_number,
      })

      console.log('Registration response:', response.data)
      set({ success: true, error: null })
    } catch (error) {
      let errorMessage = 'Error al registrar el usuario'
      if (axios.isAxiosError(error)) {
        console.log('Registration error:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        })

        errorMessage =
          error.response?.data?.message || error.message || errorMessage
      }
      set({ error: errorMessage })
    } finally {
      set({ isLoading: false })
    }
  },
  clearError: () => set({ error: null }),

  reset: () =>
    set({
      isLoading: false,
      error: null,
      success: false,
    }),

  // Validations
  isPasswordValid: (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[@$!%*?&]/.test(password)
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    )
  },

  isEmailValid: (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },
  isPhoneValid: (phone_number: string) => {
    return /^[0-9]{7,15}$/.test(phone_number)
  },
}))
