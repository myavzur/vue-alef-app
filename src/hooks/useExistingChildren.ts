import { computed } from 'vue'

import type { DraftChildren, User } from '@/interfaces'

import { useUserStore } from '@/stores'

export const useExistingChildren = () => {
  const userStore = useUserStore()

  const children = computed(() => userStore.user.children || [])
  const total = computed(() => children.value.length || 0)

  const remove = (existingId: User['id']) => {
    userStore.removeChild(existingId)
  }

  const addDraftChildren = (draftChildren: DraftChildren, callback: () => void) => {
    const newChildren = Array.from(draftChildren.values()) as User[]
    userStore.addChildren(newChildren)
    callback()
  }

  return {
    children,
    total,
    remove,
    addDraftChildren
  }
}
