export const ageToString = (age: number) => {
  let count = age % 100
  let suffix

  if (count >= 5 && count <= 20) {
    suffix = 'лет'
  } else {
    count = count % 10

    if (count == 1) {
      suffix = 'год'
    } else if (count >= 2 && count <= 4) {
      suffix = 'года'
    } else {
      suffix = 'лет'
    }
  }
  return `${age} ${suffix}`
}

export const ageToStr2 = (age: number): string => {
  const count = age % 100
  if (count >= 5 && count <= 20) {
    return `${age} лет`
  }

  const lastDigit = count % 10
  if (lastDigit === 1) {
    return `${age} год`
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${age} года`
  }

  return `${age} лет`
}
