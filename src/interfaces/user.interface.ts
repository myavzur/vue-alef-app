export interface User {
  id: number
  name: string
  age: number
  children: User[]
}

export type DraftUser = Partial<Pick<User, 'id' | 'name' | 'age'>>

export type UpdateUserInfoParams = Partial<Pick<User, 'name' | 'age'>>
