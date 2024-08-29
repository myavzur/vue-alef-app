<script setup lang="ts">
import { computed } from 'vue'
import { parseType } from './helpers'
import type { TypographyProps } from './Typography.interface'

const { type } = withDefaults(defineProps<TypographyProps>(), {
  weight: 'regular'
})

const parsedType = parseType(type)
const parsedTag = computed(() => {
  if (parsedType.tag === 'h') {
    return `h${parsedType.level}`
  }
  return 'p'
})
</script>

<template>
  <component
    :is="parsedTag"
    :class="[`typography_${parsedType.tag}-${parsedType.level}`, `typography_${weight}`]"
  >
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
h1.typography_h-1 {
  font-size: var(--typography-h-1);
}
h2.typography_h-2 {
  font-size: var(--typography-h-2);
}
h3.typography_h-3 {
  font-size: var(--typography-h-3);
}
h4.typography_h-4 {
  font-size: var(--typography-h-4);
}
h5.typography_h-5 {
  font-size: var(--typography-h-5);
}
h6.typography_h-6 {
  font-size: var(--typography-h-6);
}

p {
  .typography_p-1 {
    font-size: var(--typography-p-1);
  }

  .typography_p-2 {
    font-size: var(--typography-p-2);
  }

  .typography_p-3 {
    font-size: var(--typography-p-3);
  }
}

.typography {
  &_regular {
    font-weight: 400;
  }
  &_medium {
    font-weight: 500;
  }
  &_bold {
    font-weight: 700;
  }
}
</style>
