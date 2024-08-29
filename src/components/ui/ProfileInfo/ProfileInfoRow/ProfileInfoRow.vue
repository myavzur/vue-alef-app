<script setup lang="ts"></script>

<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
