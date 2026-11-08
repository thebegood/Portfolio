/**
 * Fichier de public/. En local le préfixe est /.
 * Sur GitHub Pages il devient /Portfolio/, via la base Vite.
 */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
}
