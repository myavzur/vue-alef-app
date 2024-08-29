<script setup lang="ts">
import ProfileLayout from '@/components/layouts/ProfileLayout'
import TextField from '@/components/ui/TextField'
import Button from '@/components/ui/Button'
import { IconPlus } from '@/components/icons'
import ProfileInfo, { ProfileInfoRow } from '@/components/ui/ProfileInfo'
import { useUserDraftChildren, useUserData } from '@/composables'
import Typography from '@/components/ui/Typography/Typography.vue'

const { userData, userDataErrors, saveData, validateData } = useUserData()

const {
  draftChildren,
  createDraftChild,
  removeDraftChild,
  hasExistingChildren,
  removeExistingChild,
  draftChildrenErrors,
  saveDraftChildren,
  totalChildren,
  validateDraftChildren
} = useUserDraftChildren()

const handleSubmit = () => {
  const isUserDataValid = validateData()
  const isDraftChildrenValid = validateDraftChildren()

  if (!isUserDataValid || !isDraftChildrenValid) return

  saveData()
  saveDraftChildren()
}
</script>

<template>
  <ProfileLayout class="profile">
    <ProfileInfo class="profile__info" label="Персональные данные">
      <TextField
        label="Имя"
        name="name"
        placeholder="Введите имя"
        v-model.trim="userData.name"
        :isError="Boolean(userDataErrors.name)"
        :errorMessage="userDataErrors.name"
      />

      <TextField
        label="Возраст"
        name="age"
        placeholder="Введите возраст"
        type="number"
        v-model="userData.age"
        :isError="Boolean(userDataErrors.age)"
        :errorMessage="userDataErrors.age"
      />
    </ProfileInfo>

    <ProfileInfo class="profile__info" label="Дети (макс. 5)">
      <template #controls>
        <Button :disabled="totalChildren >= 5" @click="createDraftChild" kind="secondary">
          <template #icon><IconPlus /></template>
          <template #default>Добавить ребенка</template>
        </Button>
      </template>

      <template #default>
        <template v-if="hasExistingChildren">
          <ProfileInfoRow v-for="child of existingChildren" :key="child.id">
            <TextField v-model="child.name" label="Имя" isReadonly />
            <TextField v-model="child.age" label="Возраст" isReadonly />

            <Button kind="primary-white" @click="removeExistingChild(child.id)">Удалить</Button>
          </ProfileInfoRow>
        </template>

        <Typography v-else type="p-3">Имеются дети? Добавьте их здесь.</Typography>

        <template v-if="draftChildren.size > 0">
          <ProfileInfoRow v-for="draftChild of draftChildren.values()" :key="draftChild.id">
            <TextField
              label="Имя"
              name="child-name"
              placeholder="Введите имя"
              v-model="draftChild.name"
              :isError="Boolean(draftChildrenErrors.get(draftChild.id)?.name)"
            />

            <TextField
              v-model="draftChild.age"
              label="Возраст"
              name="child-age"
              placeholder="Введите возраст"
              type="number"
              :isError="Boolean(draftChildrenErrors.get(draftChild.id)?.age)"
            />

            <Button kind="primary-white" @click="removeDraftChild(draftChild.id)"> Удалить </Button>
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
