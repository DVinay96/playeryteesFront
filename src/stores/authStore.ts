'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import axiosInstance from '@/lib/axios'
import axios from 'axios'

interface User {
  name: string
  username: string
  email: string
}

interface UserDetails {
  name: string,
  email: string,
  phoneNumber: string,
  userName: string,
}

interface AuthState {
  // state
  token: string | null
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null;
  isLoading: boolean
  error: string | null
  requiresPasswordChange: boolean
  isHydrated: boolean
  isForgotPasswordLoading: boolean
  forgotPasswordError: string | null
  resetPasswordSuccess: boolean

  // actions
  login: (
    username: string,
    password: string,
    newPassword?: string
  ) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  clearError: () => void
  setHydrated: (state: boolean) => void
  fetchUserDetails: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>
  confirmResetPassword: (email: string, code: string, newPassword: string) => Promise<void>
  


  // selectors
  isAuthenticated: () => boolean
  getToken: () => string | null
}

const createAuthStore = () =>
  create<AuthState>()(
    persist(
      (set, get) => ({
        token: null,
        accessToken: null,
        user: null,
        userDetails: null,
        isLoading: false,
        error: null,
        requiresPasswordChange: false,
        isHydrated: false,
        isForgotPasswordLoading: false,
        forgotPasswordError: null,
        resetPasswordSuccess: false,

        // Actions
        login: async (
          username: string,
          password: string,
          newPassword?: string
        ) => {
          set({ isLoading: true, error: null })
          try {
            const response = await axiosInstance.post('/auth/login', {
              username,
              password,
              ...(newPassword ? { newPassword } : {}),
            })

            if (response.data.requiresPasswordChange) {
              set({
                requiresPasswordChange: true,
                error: 'Se debe de cambiar la contraseña',
                isLoading: false,
              })
              return
            }
            if (response.data.idToken) {
              set({
                token: response.data.idToken,
                accessToken: response.data.accessToken,
                user: {
                  name: response.data.name,
                  username,
                  email: response.data.email,
                },
                requiresPasswordChange: false,
                error: null,
              })
            }
          } catch (error) {
            let errorMessage = 'Credenciales incorrectas'
            if (axios.isAxiosError(error)) {
              if (error.response?.status === 401) {
                errorMessage = 'Usuario o contraseña incorrectos'
              } else {
                errorMessage =
                  error.response?.data?.message || 'Error al iniciar sesión'
              }
              set({ error: errorMessage })
            } else {
              set({ error: errorMessage })
            }
            setTimeout(() => {
              set({ error: null })
            }, 3000)
          } finally {
            set({ isLoading: false })
          }
        },
        logout: () => {
          set({
            token: null,
            accessToken: null, 
            user: null,
            error: null,
            requiresPasswordChange: false,
            isLoading: false,
          })
        },

        forgotPassword: async (email: string) => {
          set({ isForgotPasswordLoading: true, forgotPasswordError: null })
          try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await axiosInstance.post('/auth/recover-password', {
              email,
            })
            
            return Promise.resolve()
          } catch (error) {
            let errorMessage = 'Error al enviar el correo de recuperación'
            if (axios.isAxiosError(error)) {
              errorMessage = error.response?.data?.message || errorMessage
            }
            set({ forgotPasswordError: errorMessage })
            
            setTimeout(() => {
              set({ forgotPasswordError: null })
            }, 3000)
            
            return Promise.reject(errorMessage)
          } finally {
            set({ isForgotPasswordLoading: false })
          }
        },
        confirmResetPassword: async (email: string, code: string, newPassword: string) => {
          set({ isLoading: true, error: null, resetPasswordSuccess: false })
          try {
            await axiosInstance.post('/auth/confirm-password', {
              email,
              code,
              newPassword,
            })
            
            set({ resetPasswordSuccess: true })
          } catch (error) {
            let errorMessage = 'Error al restablecer la contraseña'
            if (axios.isAxiosError(error)) {
              errorMessage = error.response?.data?.message || errorMessage
            }
            set({ error: errorMessage })
            
            setTimeout(() => {
              set({ error: null })
            }, 3000)
            
            return Promise.reject(errorMessage)
          } finally {
            set({ isLoading: false })
          }
        },

        fetchUserDetails: async () => {
          if (!get().isAuthenticated()) return;

          set({ isLoading: true});

          try {
            const response = await axiosInstance.get('/user');
            set({ userDetails: response.data, error: null});
          } catch ( error ) {
            let errorMessage = 'Error al obtener los detalles del usuario';
            if (axios.isAxiosError(error)) {
              errorMessage = error.response?.data?.message || errorMessage
              console.log(errorMessage);
              
            }
          }
        },

        setUser: (user) => set({ user }),
        clearError: () => set({ error: null }),
        setHydrated: (state) => set({ isHydrated: state }),

        // Selectors
        isAuthenticated: () => {
          const state = get()
          return !!state.token && !state.requiresPasswordChange
        },
        getToken: () => get().token,
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => {
          return typeof window !== 'undefined'
            ? window.localStorage
            : {
                getItem: () => null,
                setItem: () => {},
                removeItem: () => {},
              }
        }),
      }
    )
  )

export const useAuthStore = createAuthStore()

export const useIsAuthenticated = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  const isHydrated = useAuthStore((state) => state.isHydrated)

  return isHydrated && isAuthenticated
}
