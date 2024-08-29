import type { UpdateUserDataDTO } from '@/interfaces'
import { useUserStore } from '@/stores'
import { reactive } from 'vue'

type Errors = Record<keyof UpdateUserDataDTO, string>

export const useUserData = () => {
  const userStore = useUserStore()

  const userData: UpdateUserDataDTO = reactive({
    name: userStore?.user?.name,
    age: userStore?.user?.age
  })

  const userDataErrors: Errors = reactive({
    age: '',
    name: ''
  })

  const validateData = () => {
    userDataErrors.name = userData.name ? '' : 'Это поле обязательно для заполнения'
    userDataErrors.age =
      typeof userData.age === 'number' ? '' : 'Это поле обязательно для заполнения'

    const isValid = !userDataErrors.name && !userDataErrors.age
    return isValid
  }

  const saveData = () => {
    userStore.updateUserInfo(userData)
  }

  return {
    userData,
    userDataErrors,
    validateData,
    saveData
  }
}
