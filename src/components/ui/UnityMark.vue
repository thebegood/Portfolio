<script setup>
/**
 * Wordmark Unity officiel (cube + nom), à côté du titre de chaque jeu.
 * Le fond clair garde les gris du fichier : on ne recolore pas le logo.
 * `dark` sert sur le bunker, où le ciel est trop sombre pour le gris.
 */
import { asset } from '@/asset.js'

defineProps({
  tone: {
    type: String,
    default: 'light',
  },
})
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center rounded-full px-3 py-1.5"
    :class="tone === 'dark' ? 'bg-bone' : 'bg-foam/95'"
  >
    <img
      :src="asset('brands/unity.svg')"
      alt="Développé avec Unity"
      class="h-6 w-auto md:h-7"
    />
  </span>
</template>
