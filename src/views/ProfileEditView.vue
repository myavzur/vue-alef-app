<script setup lang="ts">
import ProfileLayout from '@/components/layouts/ProfileLayout.vue';
</script>

<template>
  <ProfileLayout>
    <div class="info">
      <p class="info__caption">Персональные данные</p>

    </div>
  </ProfileLayout>
</template>

<style scoped lang="scss">
.info {
  &__caption {
    font-weight: 500;
  }
}
</style>
