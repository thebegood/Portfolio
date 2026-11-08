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
          <h2 class="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Dans le bunker
          </h2>
        </div>
        <p class="max-w-sm font-hud text-base leading-snug tracking-wide text-bone/70 md:text-right">
          Manches, hordes, lumières qui tombent.
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
