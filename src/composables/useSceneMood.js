import { reactive } from 'vue'

/**
 * Pont entre le scroll (App.vue) et la scène fixe (PortfolioWorld.vue).
 * progress : 0 = plage FEEZ, 1 = bunker zombies.
 * scroll   : 0 = haut de page, 1 = bas de page (dolly caméra).
 *
 * Objet reactive module-scope : pas besoin de provide/inject,
 * la scène Tres et le DOM n'ont pas le même parent.
 */
export const sceneMood = reactive({
  progress: 0,
  scroll: 0,
})
