import type { UpdateUserDataDTO } from '@/interfaces'
import { useUserStore } from '@/stores'
import { reactive } from 'vue'

type Errors = Record<keyof UpdateUserDataDTO, string>

export const useUserData = () => {
  const userStore = useUserStore()

  const data: UpdateUserDataDTO = reactive({
    name: userStore?.user?.name,
    age: userStore?.user?.age
  })

  const errors: Errors = reactive({
    age: '',
    name: ''
  })

  const validate = () => {
    errors.name = data.name ? '' : 'Это поле обязательно для заполнения'
    errors.age = typeof data.age === 'number' ? '' : 'Это поле обязательно для заполнения'

    const isValid = !errors.name && !errors.age
    return isValid
  }

  const save = () => {
    userStore.updateInfo(data)
  }

  return {
    data,
    errors,
    validate,
    save
  }
}
