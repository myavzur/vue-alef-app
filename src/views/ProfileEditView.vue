<script setup lang="ts">
import ProfileLayout from '@/components/layouts/ProfileLayout'
import TextField from '@/components/ui/TextField'
import Button from '@/components/ui/Button'
import { IconPlus } from '@/components/icons'
import ProfileInfo, { ProfileInfoRow } from '@/components/ui/ProfileInfo'
import { useDraftChildren, useUserData } from '@/composables'
import Typography from '@/components/ui/Typography/Typography.vue'
import { computed } from 'vue'
import { useExistingChildren } from '@/composables/useExistingChildren'

const userData = useUserData()
const existingChildren = useExistingChildren()
const draftChildren = useDraftChildren()

/** Total length of existing children and draft children */
const totalChildren = computed(() => {
  return existingChildren.total.value + draftChildren.total.value
})

const handleSubmit = () => {
  const isUserDataValid = userData.validate()
  const isDraftChildrenValid = draftChildren.validate()

  if (!isUserDataValid || !isDraftChildrenValid) return

  userData.save()
  existingChildren.addDraftChildren(draftChildren.children, () => draftChildren.reset())
}
</script>

<template>
  <ProfileLayout class="profile">
    <ProfileInfo class="profile__info" label="Персональные данные">
      <TextField
        label="Имя"
        name="name"
        placeholder="Введите имя"
        v-model.trim="userData.data.name"
        :isError="Boolean(userData.errors.name)"
        :errorMessage="userData.errors.name"
      />

      <TextField
        label="Возраст"
        name="age"
        placeholder="Введите возраст"
        type="number"
        v-model="userData.data.age"
        :isError="Boolean(userData.errors.age)"
        :errorMessage="userData.errors.age"
      />
    </ProfileInfo>

    <ProfileInfo class="profile__info" label="Дети (макс. 5)">
      <template #controls>
        <Button v-if="totalChildren < 5" @click="draftChildren.create()" kind="secondary">
          <template #icon><IconPlus /></template>
          <template #default>Добавить ребенка</template>
        </Button>
      </template>

      <template #default>
        <template v-if="existingChildren.total.value > 0">
          <ProfileInfoRow
            v-for="existingChild of existingChildren.children.value"
            :key="existingChild.id"
          >
            <TextField :modelValue="existingChild.name" label="Имя" isReadonly />
            <TextField :modelValue="existingChild.age" label="Возраст" isReadonly />

            <Button kind="primary-white" @click="existingChildren.remove(existingChild.id)"
              >Удалить</Button
            >
          </ProfileInfoRow>
        </template>

        <Typography v-else type="p-3">Имеются дети? Добавьте их здесь.</Typography>

        <template v-if="draftChildren.total.value > 0">
          <ProfileInfoRow
            v-for="draftChild of draftChildren.children.values()"
            :key="draftChild.id"
          >
            <TextField
              label="Имя"
              name="child-name"
              placeholder="Введите имя"
              v-model="draftChild.name"
              :isError="Boolean(draftChildren.errors.get(draftChild.id)?.name)"
            />

            <TextField
              v-model="draftChild.age"
              label="Возраст"
              name="child-age"
              placeholder="Введите возраст"
              type="number"
              :isError="Boolean(draftChildren.errors.get(draftChild.id)?.age)"
            />

            <Button kind="primary-white" @click="draftChildren.remove(draftChild.id)">
              Удалить
            </Button>
          </ProfileInfoRow>
        </template>
      </template>
    </ProfileInfo>

    <Button class="profile__submit" kind="primary" @click="handleSubmit">Сохранить</Button>
  </ProfileLayout>
</template>

<style scoped lang="scss">
.profile {
  &__info,
  &__submit {
    margin-top: 30px;
  }
}
</style>
