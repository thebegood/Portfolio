<script setup>
import { sceneMood } from '@/composables/useSceneMood.js'
import { scrollToSelector } from '@/composables/lenis.js'

const links = [
  { href: '#haut', label: 'Accueil' },
  { href: '#projets', label: 'Chudballs' },
  { href: '#bunker', label: 'ZombieFps' },
  { href: '#poste', label: 'Expérience' },
]

function onNavClick(event) {
  const href = event.currentTarget.getAttribute('href')
  if (!href) return
  event.preventDefault()
  scrollToSelector(href)
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-30"
    :class="sceneMood.progress > 0.45 ? 'text-bone' : 'text-ink'"
  >
    <div
      class="absolute inset-x-0 top-0 h-px origin-left"
      :class="sceneMood.progress > 0.45 ? 'bg-amber' : 'bg-feez-pink'"
      :style="{ transform: `scaleX(${sceneMood.scroll})` }"
    />
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
      <a
        href="#haut"
        class="font-display text-lg font-extrabold tracking-tight"
        @click="onNavClick"
      >
        <span class="text-feez-purple">N</span><span class="text-feez-pink">P</span>
      </a>

      <p class="hidden font-hud text-sm font-semibold uppercase tracking-[0.28em] sm:block">
        {{ sceneMood.progress > 0.45 ? '02 — ZombieFps' : '01 — ChudBalls' }}
      </p>

      <nav class="flex items-center gap-3 text-[13px] sm:gap-4 sm:text-sm md:gap-6">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="transition-opacity hover:opacity-60"
          @click="onNavClick"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
