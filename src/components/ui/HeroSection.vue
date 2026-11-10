<script setup>
/**
 * Titre d'ouverture.
 * Le masque (overflow hidden) + yPercent donne le décalage de ligne.
 * data-hero-fade règle le chapô et l'indication de scroll.
 */
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(async () => {
  try {
    await document.fonts?.ready
  } catch {
    // Les polices distantes peuvent échouer : on anime quand même.
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  gsap.from('[data-hero-line]', {
    yPercent: 115,
    duration: 1.05,
    ease: 'power3.out',
    stagger: 0.12,
  })

  gsap.from('[data-hero-fade]', {
    autoAlpha: 0,
    y: 18,
    duration: 0.8,
    delay: 0.28,
    stagger: 0.08,
    ease: 'power2.out',
  })
})
</script>

<template>
  <section id="haut" class="flex min-h-[100svh] items-start px-5 pt-[14vh] pb-16 md:px-8">
    <div class="mx-auto w-full max-w-6xl text-center">
      <h1 class="font-display font-extrabold tracking-[-0.045em] text-ink">
        <span class="sr-only">Noa Pelletier - Gameplay Programmer</span>
        <span class="block overflow-hidden py-1" aria-hidden="true">
          <span
            data-hero-line
            class="block text-[clamp(1.25rem,7.6vw,6.4rem)] leading-[0.9] whitespace-nowrap"
          >
            Noa Pelletier
          </span>
        </span>
        <span class="block overflow-hidden py-1" aria-hidden="true">
          <span
            data-hero-line
            class="block text-[clamp(0.9rem,4.5vw,2.6rem)] leading-[0.95] font-bold tracking-[-0.03em] text-ink/80"
          >
            Gameplay Programmer
          </span>
        </span>
      </h1>

      <p
        data-hero-fade
        class="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg"
      >
        Game Designer & Programmer.
      </p>

      <p
        data-hero-fade
        class="mt-14 font-hud text-xs font-semibold uppercase tracking-[0.38em] text-ink/70"
      >
        Défiler
      </p>
    </div>
  </section>
</template>
