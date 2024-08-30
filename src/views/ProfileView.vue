<script setup lang="ts">
import { computed } from 'vue'
import ProfileLayout from '@/components/layouts/ProfileLayout/ProfileLayout.vue'
import Typography from '@/components/ui/Typography'
import TextField from '@/components/ui/TextField'
import ProfileInfo, { ProfileInfoRow } from '@/components/ui/ProfileInfo'
import { useUserStore } from '@/stores'
import { useExistingChildren } from '@/composables'
import { ageToString } from '@/helpers'

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
