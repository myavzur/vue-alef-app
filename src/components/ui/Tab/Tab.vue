<script setup lang="ts">
import Typography from '@/components/ui/Typography'
</script>

<template>
  <button class="tab">
    <Typography type="p-2">
      <slot></slot>
    </Typography>
  </button>
</template>

<style scoped lang="scss">
.tab {
  cursor: pointer;
  font-family: inherit;
  background: none;
  outline: none;
  border: none;

  height: 100%;
  display: flex;
  align-items: center;
  font-size: var(--typography-p-2);
  border-bottom: 1px solid #11111100; // COLORS
  color: #11111148; // COLORS

  transition: color 0.3s;

  &:hover,
  &:focus {
    color: #6b6b6b; // COLORS
    border-bottom: 1px solid #11111148; // COLORS
  }
}
</style>
