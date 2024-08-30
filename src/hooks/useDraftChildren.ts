import { computed, reactive } from 'vue'

import type { DraftChild, DraftChildWithId, User } from '@/interfaces'

type DraftChildrenErrors = Map<User['id'], Partial<Record<keyof DraftChild, string>>>
type DraftChildren = Map<User['id'], DraftChildWithId>

export const useDraftChildren = () => {
  const errors: DraftChildrenErrors = reactive(new Map([]))
  const children: DraftChildren = reactive(new Map([]))
  const total = computed(() => children.size)

  const create = () => {
    const childId = Math.random()

    children.set(childId, {
      id: childId,
      name: undefined,
      age: undefined
    })
  }

  const remove = (id: DraftChildWithId['id']) => {
    children.delete(id)
  }

  const validate = () => {
    errors.clear()

    let isValid = true
    if (!children.size) return isValid

    children.forEach((child) => {
      const isNameValid = child.name
      const isAgeValid = child.age

      errors.set(child.id, {
        name: isNameValid ? '' : 'Это поле обязательно для заполнения',
        age: isAgeValid ? '' : 'Это поле обязательно для заполнения'
      })

      isValid = Boolean(isNameValid && isAgeValid)
    })

    return isValid
  }

  const reset = () => {
    children.clear()
  }

  return {
    errors,
    children,
    total,

    create,
    remove,
    validate,
    reset
  }
}
