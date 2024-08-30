<script setup lang="ts">
import IconLogoAlef from '@/components/icons/IconLogoAlef.vue'

import Tab from '@/components/ui/Tab'
import Typography from '@/components/ui/Typography'
</script>

<template>
  <div class="layout">
    <header class="header">
      <IconLogoAlef class="header__logo" />

      <nav class="header__navigation navigation">
        <Tab @click="$router.push('/edit')">Форма</Tab>
        <Tab @click="$router.push('/')">Превью</Tab>
      </nav>
    </header>

    <div class="content">
      <slot></slot>
    </div>

    <footer class="footer">
      <Typography type="p-3">all rights reserved</Typography>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.layout {
  --header-height: 75px;
  padding: var(--header-height) 0;
}

.header,
.footer {
  position: fixed;
  right: 0;
  width: 100%;
}

.header {
  top: 0;
  height: var(--header-height);
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  align-items: center;
  padding: 0px 92px;
  box-shadow: 0px 1px 0px #11111110; // COLORS

  &__logo {
    justify-self: flex-start;
  }
}

.navigation {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 25px;
}

.content {
  width: min(620px, 100%);
  margin: 0 auto;
}

.footer {
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--header-height);
  background-color: #fafafa; // COLORS
}
</style>
