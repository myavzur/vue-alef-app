import type { TypographyProps } from '../Typography.interface'

export const parseType = (type: TypographyProps['type']) => {
  // Возвращает 2 группы: [tag, level]
  const match = type.match(/^([a-z]+)-(\d+)$/)
  if (!match) {
    throw `Couldn't parse type of '${type}'.`
  }
  return { tag: match[1], level: parseInt(match[2]) }
}
