export interface User {
  id: number
  name: string
  age: number
  children: User[]
}

export type DraftUser = Partial<Pick<User, 'name' | 'age'>>
export type DraftUserWithId = Pick<User, 'id'> & DraftUser

export type UpdateUserDataDTO = Partial<Pick<User, 'name' | 'age'>>
