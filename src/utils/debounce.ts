/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  delay: number,
): (...args: Params) => any {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}
