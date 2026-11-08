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
      <ShortsReel class="mt-4 mb-8 md:mb-10" />

      <div class="mb-20 grid grid-cols-1 gap-4 md:mb-28 md:grid-cols-12 md:gap-5">
        <figure
          data-project-card
          class="overflow-hidden rounded-3xl bg-foam/92 text-ink shadow-[0_24px_50px_-32px_rgba(36,31,20,0.55)] md:col-span-7"
        >
          <img
            src="/projects/1_map2.png"
            alt="Map de ChudBalls : une île dans le bassin, entre deux chaises de maître-nageur."
            class="aspect-video w-full bg-sky object-contain"
          />
          <figcaption class="px-6 py-5">
            <p class="font-hud text-sm font-semibold uppercase tracking-[0.28em] text-sea">
              La map
            </p>
            <p class="mt-2 text-base leading-relaxed text-ink/85">
              L’île au centre du bassin, où chaque plateforme peut tomber à tout moment si un joueur tire sa balle dessus. Des cannons tirent des grosses balles sur l'île.
            </p>
          </figcaption>
        </figure>

        <figure
          data-project-card
          class="overflow-hidden rounded-3xl bg-foam/92 text-ink shadow-[0_24px_50px_-32px_rgba(36,31,20,0.55)] md:col-span-5"
        >
          <img
            src="/projects/thumbnail.jpg"
            alt="Menu de ChudBalls : héberger, trouver une partie, changer de classe, lancer."
            class="aspect-video w-full bg-sky object-contain"
          />
          <figcaption class="px-6 py-5">
            <p class="font-hud text-sm font-semibold uppercase tracking-[0.28em] text-sea">
              Le menu
            </p>
            <p class="mt-2 text-base leading-relaxed text-ink/85">
              Le lobby : héberger ou rejoindre grâce à l'API de Steam, choisir une classe, puis lancer la partie.
            </p>
          </figcaption>
        </figure>
      </div>

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
