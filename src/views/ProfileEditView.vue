<script setup lang="ts">
import { computed, reactive } from 'vue'

import { useUserStore } from '@/stores'
import type { DraftUser, UpdateUserInfoParams, User } from '@/interfaces'
import ProfileLayout from '@/components/layouts/ProfileLayout'
import TextField from '@/components/ui/TextField'
import Button from '@/components/ui/Button'
import { IconPlus } from '@/components/icons'
import { storeToRefs } from 'pinia'
import Typography from '@/components/ui/Typography/Typography.vue'

const userStore = useUserStore()

const userData = reactive<UpdateUserInfoParams>({
  name: userStore?.user?.name,
  age: userStore?.user?.age
})

const draftChildren = reactive<Map<User['id'], DraftUser>>(new Map([]))

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
  const isDraftChildrenValid = Array.from(draftChildren.values()).every(
    (child) => child.name && child.age
  )

  if (!isDraftChildrenValid) {
    console.log('Не заполнены все поля')
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
        <TextField label="Имя" name="name" placeholder="Введите имя" v-model.trim="userData.name" />

        <TextField
          label="Возраст"
          name="age"
          placeholder="Введите возраст"
          type="number"
          v-model="userData.age"
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

        <div
          class="info__row"
          v-for="[draftChildId, draftChild] in draftChildren"
          :key="draftChildId"
        >
          <TextField label="Имя" name="name" placeholder="Введите имя" v-model="draftChild.name" />

          <TextField
            label="Возраст"
            name="age"
            placeholder="Введите возраст"
            type="number"
            v-model="draftChild.age"
          />

          <Button kind="primary-white" @click="removeDraftChild(draftChildId)">Удалить</Button>
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
