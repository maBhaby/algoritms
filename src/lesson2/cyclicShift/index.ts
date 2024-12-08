export const isCyclicShift = (S: string, T: string): number => {
  if (S.length !== T.length || S.length === 0) {
    return -1
  }

  const doubleS = S + S

  const index = doubleS.indexOf(T)

  if (index === -1) {
    return -1
  }

  return index % S.length
}
