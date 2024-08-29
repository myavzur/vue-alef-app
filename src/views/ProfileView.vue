<script setup lang="ts">
import ProfileLayout from '@/components/layouts/ProfileLayout/ProfileLayout.vue'
import Typography from '@/components/ui/Typography'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const userName = userStore.user?.name || 'Неизвестно'
const userAge = userStore.user?.age || 'Наверное взрослый'
</script>

<template>
  <ProfileLayout>
    <div class="info">
      <Typography type="p-2" weight="medium">Персональные данные</Typography>

      <Typography class="info__name" type="p-2" weight="bold">
        {{ userName }}, {{ userAge }}
      </Typography>
    </div>
  </ProfileLayout>
</template>

<style scoped lang="scss">
.info {
  margin-top: 30px;

  &__name {
    margin-top: 20px;
  }
}
</style>
