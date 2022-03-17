export const pause = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, delay)
  })
}