<script setup>
/**
 * Grille acte 1. Chaque carte a son ScrollTrigger :
 * elle apparaît quand elle entre dans le viewport, pas en paquet.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { beachProjects } from '@/data/projects.js'
import ProjectCard from './ProjectCard.vue'
import ShortsReel from './ShortsReel.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !sectionRef.value) return

  ctx = gsap.context(() => {
    gsap.utils.toArray('[data-project-card]').forEach((card) => {
      gsap.from(card, {
        y: 48,
        autoAlpha: 0,
        duration: 0.85,
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
  <section id="projets" ref="sectionRef" class="px-5 py-24 md:px-8 md:py-32">
    <div class="mx-auto max-w-6xl">
      <div class="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="font-hud text-sm font-semibold uppercase tracking-[0.32em] text-sea">
            Chapitre 01
          </p>
          <h2 class="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            Sur la plage
          </h2>
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-ink/75 md:text-right">
          Le jeu en shorts, puis les bancs d’essai physique et réseau.
        </p>
      </div>

      <ShortsReel class="mt-4 mb-20 md:mb-28" />

      <div class="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        <ProjectCard
          v-for="project in beachProjects"
          :key="project.id"
          :project="project"
          tone="beach"
        />
      </div>
    </div>
  </section>
</template>
