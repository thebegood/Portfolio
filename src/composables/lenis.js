import { shallowRef } from 'vue'

/** Instance créée dans App.vue. Les liens du header passent par ici. */
export const lenisRef = shallowRef(null)

export function scrollToSelector(selector) {
  const target = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!target) return

  const lenis = lenisRef.value
  if (lenis) {
    lenis.scrollTo(target, { offset: -72 })
    return
  }

  target.scrollIntoView({ behavior: 'auto', block: 'start' })
}
