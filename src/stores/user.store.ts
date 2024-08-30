import { defineStore } from 'pinia'

import type { UpdateUserDataDTO, User } from '@/interfaces'

interface State {
  user: User
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    const userInStore = localStorage.getItem('user')
    return {
      user: userInStore ? JSON.parse(userInStore) : { children: [] }
    }
  },
  actions: {
    saveUser() {
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    updateInfo(newInfo: UpdateUserDataDTO) {
      if (!this.user) return

      this.user = {
        ...this.user,
        ...newInfo
      }

      this.saveUser()
    },

    addChildren(children: User[]) {
      if (!this.user) return
      this.user.children.push(...children)

      this.saveUser()
    },

    removeChild(id: User['id']) {
      if (!this.user) return
      this.user.children = this.user.children.filter((child) => child.id !== id)

      this.saveUser()
    }
  }
})
