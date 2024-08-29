import type { User, DraftUser, DraftUserWithId } from '@/interfaces'
import { useUserStore } from '@/stores'
import { reactive, computed } from 'vue'

type DraftChildrenErrors = Map<User['id'], Partial<Record<keyof DraftUser, string>>>
type DraftChildren = Map<User['id'], DraftUserWithId>

export const useDraftChildren = () => {
  const userStore = useUserStore()

  const draftChildrenErrors: DraftChildrenErrors = reactive(new Map([]))
  const draftChildren: DraftChildren = reactive(new Map([]))

  /** Total length of existing children and draft children */
  const totalChildren = computed(() => {
    if (!userStore.user.children) return draftChildren.size
    return userStore.user.children.length + draftChildren.size
  })

  const createDraftChild = () => {
    const childId = Math.random()

    draftChildren.set(childId, {
      id: childId,
      name: undefined,
      age: undefined
    })
  }

  const removeDraftChild = (id: User['id']) => {
    draftChildren.delete(id)
  }

  const saveDraftChildren = () => {
    const newChildren = Array.from(draftChildren.values()) as User[]
    userStore.addUserChildren(newChildren)
    draftChildren.clear()
  }

  const validateDraftChildren = () => {
    draftChildrenErrors.clear()

    let isValid = true
    if (!draftChildren.size) return isValid

    draftChildren.forEach((draftChild) => {
      const isNameValid = draftChild.name
      const isAgeValid = draftChild.age

      draftChildrenErrors.set(draftChild.id, {
        name: isNameValid ? '' : 'Это поле обязательно для заполнения',
        age: isAgeValid ? '' : 'Это поле обязательно для заполнения'
      })

      isValid = Boolean(isNameValid && isAgeValid)
    })

    console.log(draftChildrenErrors)

    return isValid
  }

  return {
    draftChildrenErrors,
    draftChildren,
    totalChildren,

    createDraftChild,
    removeDraftChild,
    validateDraftChildren,
    saveDraftChildren
  }
}
