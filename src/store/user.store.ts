import { create } from 'zustand'

import type { UserType } from '@/types/user.types'

interface UserStateProps {
	user: UserType | null
	setUser: (user: UserType) => void
}

export const useUserStore = create<UserStateProps>((set) => ({
	user: null,
	setUser: (data) => set(() => ({ user: data }))
}))
