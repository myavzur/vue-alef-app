import type { UpdateUserInfoParams, User } from '@/interfaces'
import { defineStore } from 'pinia'

interface State {
  user: User | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: {
      id: Math.random(),
      name: 'John Doe',
      age: 25,
      children: [
        {
          id: Math.random(),
          name: 'Алексей',
          age: 13,
          children: []
        }
      ]
    }
  }),
  actions: {
    setUser(newUser: User) {
      this.user = newUser
    },

    updateUserInfo(newInfo: UpdateUserInfoParams) {
      if (!this.user) return

      this.user = {
        ...this.user,
        ...newInfo
      }
    },

    addUserChildren(children: User[]) {
      if (!this.user) return
      this.user.children.push(...children)
    },

    removeUserChild(id: User['id']) {
      if (!this.user) return
      this.user.children = this.user.children.filter((child) => child.id !== id)
    }
  }
})
