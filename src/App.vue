<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import IconLogoAlef from '@/components/icons/IconLogoAlef.vue';

</script>

<template>
  <div class="app">
    <header class="header">
      <IconLogoAlef
        class="header__logo"
      />

      <nav class="header__navigation navigation">
        <RouterLink to="/edit" class="navigation__link">Форма</RouterLink>
        <RouterLink to="/" class="navigation__link">Превью</RouterLink>
      </nav>
    </header>

    <RouterView />

    <footer class="footer">
      <p class="footer__caption">all rights reserved</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.app {
  --header-height: 75px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
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

  &__link {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: var(--typography-p-2);
    color: #111111; // COLORS
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--header-height);
  background-color: #FAFAFA; // COLORS

  &__caption {
    font-size: var(--typography-p-3);
  }
}
</style>
