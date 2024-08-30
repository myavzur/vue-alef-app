<script setup lang="ts">
import { computed } from 'vue'

import { ageToString } from '@/helpers'

import { useUserStore } from '@/stores'

import { useExistingChildren } from '@/hooks'

import { ProfileLayout } from '@/components/layouts'

import ProfileInfo, { ProfileInfoRow } from '@/components/ui/ProfileInfo'
import TextField from '@/components/ui/TextField'
import Typography from '@/components/ui/Typography'

const userStore = useUserStore()
const existingChildren = useExistingChildren()

const userName = userStore.user?.name || 'Неизвестно'

const userAge = computed(() => {
  const age = userStore.user?.age
  if (typeof age !== 'number') return 'Наверное взрослый'
  return ageToString(age)
})
</script>

<template>
  <ProfileLayout const="profile">
    <ProfileInfo class="profile__info" label="Персональные данные">
      <Typography class="info__name" type="p-2" weight="bold">
        {{ userName }}, {{ userAge }}
      </Typography>
    </ProfileInfo>

    <ProfileInfo v-if="existingChildren.total.value > 0" class="profile__info" label="Дети">
      <ProfileInfoRow v-for="child of existingChildren.children.value" :key="child.id">
        <TextField isReadonly label="Имя" :modelValue="child.name" />

        <TextField isReadonly label="Возраст" :modelValue="ageToString(child.age)" />
      </ProfileInfoRow>
    </ProfileInfo>
  </ProfileLayout>
</template>

<style scoped lang="scss">
.profile {
  &__info {
    margin-top: 30px;
  }
}
</style>
