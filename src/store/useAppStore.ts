import { create } from 'zustand'

interface AppState {
  theme: 'dark' | 'light'
  isChatDrawerOpen: boolean
  userEmail: string
  setTheme: (theme: 'dark' | 'light') => void
  toggleTheme: () => void
  setChatDrawerOpen: (isOpen: boolean) => void
  setUserEmail: (email: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark', // Default to Deep-Space Dark Mode
  isChatDrawerOpen: false,
  userEmail: 'user@example.com', // Placeholder or fetched later

  setTheme: (theme) => {
    if (theme === 'light') {
      document.documentElement.classList.add('warm-light')
    } else {
      document.documentElement.classList.remove('warm-light')
    }
    set({ theme })
  },

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark'
    if (newTheme === 'light') {
      document.documentElement.classList.add('warm-light')
    } else {
      document.documentElement.classList.remove('warm-light')
    }
    return { theme: newTheme }
  }),

  setChatDrawerOpen: (isOpen) => set({ isChatDrawerOpen: isOpen }),
  setUserEmail: (email) => set({ userEmail: email }),
}))