export function useLoggedInState() {
  return JSON.parse(localStorage.getItem('user')!)
}
