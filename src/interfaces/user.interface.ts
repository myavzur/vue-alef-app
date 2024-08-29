export interface User {
  id: number
  name: string
  age: number
  children: User[]
}

export type DraftUser = Pick<User, 'id'> & Partial<Pick<User, 'name' | 'age'>>

export type UpdateUserInfoParams = Partial<Pick<User, 'name' | 'age'>>
