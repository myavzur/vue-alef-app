<script setup lang="ts">
import type { ButtonProps } from './Button.interface'
import Typography from '@/components/ui/Typography'

const { kind } = withDefaults(defineProps<ButtonProps>(), {
  kind: 'primary'
})
</script>

<template>
  <button
    :class="[
      'button',
      {
        [`button_${kind}`]: Boolean(kind)
      }
    ]"
  >
    <div v-if="$slots.icon" class="button__icon">
      <slot name="icon"></slot>
    </div>

    <Typography type="p-2">
      <slot></slot>
    </Typography>
  </button>
</template>

<style scoped lang="scss">
.button {
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
  font-family: inherit;
  display: flex;
  align-items: center;
  border-radius: 100px;
  font-size: var(--typography-p-2);
  padding: 0.7em 1.25em; // 10px 20px
  transition: opacity 0.3s;

  &__icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.3125em; // 10px
  }

  &_primary {
    color: #ffffff; // COLORS
    background: #01a7fd; // COLORS
  }

  &_primary-white {
    color: #01a7fd; // COLORS
    background: none;
    border: none;
  }

  &_secondary {
    background: none;
    border: 2px solid #01a7fd; // COLORS
    color: #01a7fd; // COLORS
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>
