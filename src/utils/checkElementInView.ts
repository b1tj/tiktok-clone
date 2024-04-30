export function checkElementInView(element: HTMLElement) {
  if (element) {
    const rect = element.getBoundingClientRect()
    const { top, bottom } = rect

    return (
      top - 60 < window.innerHeight / 2 - 60 &&
      bottom > window.innerHeight / 3 + 60
    )
  }
}
