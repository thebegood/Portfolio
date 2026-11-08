<script setup>
/**
 * Couche WebGL. Reste fixe derrière le HTML.
 *
 * Classes demandées : fixed inset-0 z-0.
 * pointer-events-none : le canvas ne vole ni le scroll ni les clics.
 * Pour rendre le mesh cliquable (ou brancher OrbitControls) :
 * retire pointer-events-none, puis suis le commentaire dans PortfolioWorld.vue.
 *
 * Le mesh idle et le mode d'emploi .glb sont dans IdleKnot.vue.
 * Les lumières, le brouillard et le fondu plage → bunker sont dans PortfolioWorld.vue.
 */
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'
import PortfolioWorld from './PortfolioWorld.vue'
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
    <!--
      NoToneMapping : les hex de la palette restent fidèles au jeu.
      Pour un rendu plus cinéma sur le bunker, passe à ACESFilmicToneMapping
      (import depuis 'three') et monte tone-mapping-exposure autour de 1.
      C'est un réglage de renderer : il s'applique à toute la scène, pas à un mesh.
    -->
    <TresCanvas
      clear-color="#3ed4ec"
      :alpha="false"
      :antialias="true"
      :dpr="[1, 1.75]"
      :tone-mapping="NoToneMapping"
    >
      <PortfolioWorld />
    </TresCanvas>
  </div>
</template>
