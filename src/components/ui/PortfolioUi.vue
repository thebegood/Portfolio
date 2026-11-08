<script setup>
/**
 * Toute l'interface qui défile.
 * La scène 3D n'est pas ici : elle est montée en sibling dans App.vue,
 * en position fixed, derrière ce bloc.
 *
 * Acte 1 (#haut, #projets) : couleurs FEEZ, fond transparent.
 * #bascule                  : le dégradé qui amorce le bunker.
 * Acte 2 (#bunker)          : béton, ambre, vert d'interface.
 */
import SiteHeader from './SiteHeader.vue'
import HeroSection from './HeroSection.vue'
import ProjectsSection from './ProjectsSection.vue'
import ZombieSection from './ZombieSection.vue'
import SiteFooter from './SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <ProjectsSection />
    <!--
      Déclencheur du changement d'ambiance 3D.
      App.vue observe #bascule avec ScrollTrigger et écrit sceneMood.progress.
    -->
    <div
      id="bascule"
      aria-hidden="true"
      class="pointer-events-none h-[32vh] bg-gradient-to-b from-transparent via-void/40 to-void"
    />
    <ZombieSection />
    <SiteFooter />
  </main>
</template>
