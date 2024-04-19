export function debounce<Params extends unknown[]>(
  func: (...args: Params) => void,
  delay: number,
): (...args: Params) => void {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}
