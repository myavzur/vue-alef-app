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
