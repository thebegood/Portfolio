<script setup>
/**
 * Acte 2. Même révélation ScrollTrigger que ProjectsSection,
 * une carte à la fois, quand elle entre dans le viewport.
 * Le fond sombre est volontairement translucide : la scène 3D,
 * déjà basculée vers le bunker par #bascule, reste visible derrière.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { bunkerProjects } from '@/data/projects.js'
import ProjectCard from './ProjectCard.vue'
import UnityMark from './UnityMark.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !sectionRef.value) return

  ctx = gsap.context(() => {
    gsap.utils.toArray('[data-project-card]').forEach((card) => {
      gsap.from(card, {
        y: 56,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        // Un transform laissé sur la carte empêche Chrome d'envoyer
        // le clic souris dans l'iframe YouTube. Le tactile, lui, passe.
        onComplete: () => gsap.set(card, { clearProps: 'transform' }),
      })
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="bunker"
    ref="sectionRef"
    class="relative bg-void/80 px-5 py-24 text-bone md:px-8 md:py-32"
  >
    <div class="bunker-grain pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative mx-auto max-w-6xl">
      <div class="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="font-hud text-sm font-semibold uppercase tracking-[0.32em] text-perk">
            Chapitre 02
          </p>
          <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 class="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              ZombieFPS
            </h2>
            <UnityMark tone="dark" />
          </div>
        </div>
        <p class="max-w-sm font-hud text-base leading-snug tracking-wide text-bone/70 md:text-right">
          Manches, hordes, barricades, différentes armes et animations faites maison.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        <ProjectCard
          v-for="project in bunkerProjects"
          :key="project.id"
          :project="project"
          tone="bunker"
        />
      </div>
    </div>
  </section>
</template>
