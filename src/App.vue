<script setup>
/**
 * Lenis vit ici, dans l'application principale — pas dans un enfant.
 *
 * Une seule boucle requestAnimationFrame appelle lenis.raf(time).
 * time est déjà en millisecondes, l'unité attendue par Lenis.
 *
 * On ne branche PAS en plus gsap.ticker : deux horloges feraient
 * avancer le smooth scroll deux fois par frame.
 *
 * ScrollTrigger.update est appelé dans l'événement `scroll` de Lenis,
 * donc les révélations de cartes restent calées sur la position lissée.
 *
 * prefers-reduced-motion : pas de Lenis. Le scroll natif reste en place,
 * et le basculement de scène suit quand même la position.
 */
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SceneCanvas from '@/components/scene/SceneCanvas.vue'
import PortfolioUi from '@/components/ui/PortfolioUi.vue'
import { sceneMood } from '@/composables/useSceneMood.js'
import { lenisRef } from '@/composables/lenis.js'

gsap.registerPlugin(ScrollTrigger)

let lenis
let rafId = 0
let moodTrigger
let removeNativeScroll = () => {}

function syncPageScroll(scroll, limit) {
  sceneMood.scroll = limit > 0 ? scroll / limit : 0
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Le bandeau #bascule est le fondu HTML plage → bunker.
  // self.progress vaut 0 au-dessus, 1 une fois le bandeau traversé, et y reste.
  moodTrigger = ScrollTrigger.create({
    trigger: '#bascule',
    start: 'top 85%',
    end: 'bottom 30%',
    scrub: reduce ? true : 0.5,
    onUpdate: (self) => {
      sceneMood.progress = self.progress
    },
  })

  if (reduce) {
    const onScroll = () => {
      const limit = document.documentElement.scrollHeight - window.innerHeight
      syncPageScroll(window.scrollY, limit)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    removeNativeScroll = () => window.removeEventListener('scroll', onScroll)
    return
  }

  lenis = new Lenis({
    autoRaf: false,
    duration: 1.15,
    smoothWheel: true,
    // Ancres gérées à la main (offset du header) dans composables/lenis.js.
    anchors: false,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  lenis.on('scroll', (instance) => {
    ScrollTrigger.update()
    syncPageScroll(instance.scroll, instance.limit)
  })

  lenisRef.value = lenis

  const raf = (time) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  // Les triggers sont créés avant que les polices ne calent la mise en page.
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  removeNativeScroll()
  lenis?.destroy()
  lenisRef.value = null
  moodTrigger?.kill()
})
</script>

<template>
  <SceneCanvas />
  <!-- Le HTML défile par-dessus le canvas. Le fond reste transparent pour laisser voir la scène. -->
  <div class="relative z-10 bg-transparent">
    <PortfolioUi />
  </div>
</template>
