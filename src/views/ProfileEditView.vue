<script setup lang="ts">
import { computed, reactive } from 'vue'

import { useUserStore } from '@/stores'
import type { DraftUser, UpdateUserInfoParams, User } from '@/interfaces'
import ProfileLayout from '@/components/layouts/ProfileLayout'
import TextField from '@/components/ui/TextField'
import Button from '@/components/ui/Button'
import { IconPlus } from '@/components/icons'
import Typography from '@/components/ui/Typography/Typography.vue'

const userStore = useUserStore()

const userData = reactive<UpdateUserInfoParams>({
  name: userStore?.user?.name,
  age: userStore?.user?.age
})

const userDataErrors = reactive<Record<keyof UpdateUserInfoParams, string>>({
  age: '',
  name: ''
})

const draftChildren = reactive<Map<User['id'], DraftUser>>(new Map([]))
const draftChildrenErrors = reactive<Map<User['id'], DraftUser>>(new Map([]))

// Total length of existing children and draft children
const totalChildren = computed(() => {
  if (!userStore?.user?.children) return draftChildren.size
  return userStore?.user.children.length + draftChildren.size
})

const removeChild = (id: User['id']) => {
  userStore.removeUserChild(id)
}

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

const handleSubmit = () => {
  console.log(userData)
  if (!userData.name) {
    userDataErrors.name = 'Это поле обязательно для заполнения'
    console.log(userDataErrors)
    return
  }

  if (!userData.age) {
    userDataErrors.age = 'Это поле обязательно для заполнения'
    return
  }

  userStore.updateUserInfo(userData)
  userStore.addUserChildren(Array.from(draftChildren.values()) as User[])

  draftChildren.clear()
}
</script>

<template>
  <ProfileLayout>
    <div class="info">
      <div class="info__header">
        <Typography type="p-2" weight="medium">Персональные данные</Typography>
      </div>

      <div class="info__rows">
        <TextField
          label="Имя"
          name="name"
          placeholder="Введите имя"
          v-model.trim="userData.name"
          :errorMessage="userDataErrors.name"
        />

        <TextField
          label="Возраст"
          name="age"
          placeholder="Введите возраст"
          type="number"
          v-model="userData.age"
          :errorMessage="userDataErrors.age"
        />
      </div>
    </div>

    <div class="info">
      <div class="info__header">
        <Typography type="p-2" weight="medium">Дети (макс. 5)</Typography>

        <Button :disabled="totalChildren >= 5" @click="createDraftChild" kind="secondary">
          <template #icon><IconPlus /></template>
          <template #default>Добавить ребенка</template>
        </Button>
      </div>

      <div class="info__rows">
        <template v-if="userStore.user?.children && userStore.user.children.length >= 0">
          <div class="info__row" v-for="child in userStore.user.children" :key="child.id">
            <TextField
              v-model="child.name"
              label="Имя"
              placeholder="Введите имя"
              name="name"
              isReadonly
            />

            <TextField
              v-model="child.age"
              label="Возраст"
              placeholder="Введите возраст"
              name="age"
              type="number"
              isReadonly
            />

            <Button kind="primary-white" @click="removeChild(child.id)">Удалить</Button>
          </div>
        </template>

        <div class="info__row" v-for="draftChild of draftChildren.values()" :key="draftChild.id">
          <TextField label="Имя" name="name" placeholder="Введите имя" v-model="draftChild.name" />

          <TextField
            v-model="draftChild.age"
            label="Возраст"
            name="age"
            placeholder="Введите возраст"
            type="number"
          />

          <Button kind="primary-white" @click="removeDraftChild(draftChild.id)">Удалить</Button>
        </div>
      </div>
    </div>

    <Button class="submit" kind="primary" @click="handleSubmit">Сохранить</Button>
  </ProfileLayout>
</template>

<style scoped lang="scss">
.info {
  margin-top: 30px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__rows {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 15px;
  }
}

.submit {
  margin-top: 30px;
}
</style>
