<script setup lang="ts">
import Typography from '../Typography/Typography.vue'
import type { TextFieldProps } from './TextField.interface'

const { label, name, type, placeholder, isReadonly } = withDefaults(defineProps<TextFieldProps>(), {
  type: 'text'
})

const model = defineModel({
  required: false
})
</script>

<template>
  <label
    :class="[
      'field',
      {
        field_readonly: Boolean(isReadonly)
      }
    ]"
  >
    <Typography class="field__caption" type="p-3">{{ label }}</Typography>

    <input
      class="field__input"
      v-model="model"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :readonly="isReadonly"
    />
  </label>
</template>

<style scoped lang="scss">
.field {
  user-select: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 15px;
  background-color: #ffffff; // COLORS
  border: 1px solid #f1f1f1; // COLORS
  border-radius: 5px;

  &_readonly {
    cursor: default;

    .field__input {
      cursor: default;
    }
  }

  &__caption {
    color: #11111148; // COLORS
  }

  &__input {
    font-size: var(--typography-p-2);
    color: #000000; // COLORS
    outline: none;
    border: none;

    // Disable number input arrows
    &[type='number'] {
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }

    &::placeholder {
      color: #11111148;
    }
  }
}
</style>
