export interface User {
  id: number
  name: string
  age: number
  children: User[]
}

export type DraftChild = Partial<Pick<User, 'name' | 'age'>>
export type DraftChildWithId = Pick<User, 'id'> & DraftChild
export type DraftChildren = Map<User['id'], DraftChildWithId>
export type DraftChildrenErrors = Map<User['id'], Partial<Record<keyof DraftChild, string>>>

export type UpdateUserDataDTO = Partial<Pick<User, 'name' | 'age'>>
