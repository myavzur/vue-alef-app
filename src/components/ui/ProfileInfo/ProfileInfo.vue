<script setup lang="ts">
import Typography from '@/components/ui/Typography'

import type { ProfileInfoProps } from './ProfileInfo.interface'

const { label } = defineProps<ProfileInfoProps>()
</script>

<template>
  <div class="info">
    <div class="info__header">
      <Typography type="p-2" weight="medium">{{ label }}</Typography>

      <slot name="controls"></slot>
    </div>

    <div class="info__rows">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
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
</style>
