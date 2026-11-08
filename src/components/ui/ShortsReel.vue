<script setup>
/**
 * Carrousel vertical pour les shorts du premier jeu.
 * Une seule iframe est montée, celle du slide en lecture :
 * les autres restent une vignette, pour ne pas lancer cinq lecteurs.
 * Glisser horizontalement, ou les flèches. La molette verticale
 * reste au scroll de la page.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { beachShorts } from '@/data/shorts.js'

const videos = beachShorts
const viewport = ref(null)
const index = ref(0)
const playingId = ref(null)
const offset = ref(0)
const cardWidth = ref(300)
const gap = 28

let tween
let resizeObserver
let reduce = false
let pointerId = null
let startX = 0
let startOffset = 0
let dragMoved = false
let pressedId = null
let suppressClick = false

function measureCard(viewportWidth) {
  if (viewportWidth < 720) return Math.round(Math.min(300, Math.max(210, viewportWidth * 0.72)))
  return Math.round(Math.min(360, Math.max(260, viewportWidth * 0.28)))
}

function targetFor(i) {
  const viewportWidth = viewport.value?.clientWidth || cardWidth.value
  return viewportWidth / 2 - cardWidth.value / 2 - i * (cardWidth.value + gap)
}

function place(i, immediate) {
  const next = targetFor(i)
  tween?.kill()
  if (immediate || reduce) {
    offset.value = next
    return
  }
  const state = { value: offset.value }
  tween = gsap.to(state, {
    value: next,
    duration: 0.8,
    ease: 'power3.out',
    onUpdate: () => {
      offset.value = state.value
    },
  })
}

function measure() {
  const viewportWidth = viewport.value?.clientWidth || 360
  cardWidth.value = measureCard(viewportWidth)
  place(index.value, true)
}

function go(direction) {
  playingId.value = null
  const count = videos.length
  index.value = (index.value + direction + count) % count
  place(index.value, false)
}

function play(id) {
  // Un vrai glisser (voir onPointerUp) annule le clic. Un léger tremblement, non.
  if (dragMoved) return
  playingId.value = playingId.value === id ? null : id
}

function embedSrc(id) {
  // origin + referrer : sans ça YouTube répond erreur 153 et le lecteur meurt
  // après avoir pourtant démarré.
  const origin = encodeURIComponent(window.location.origin)
  const params = `autoplay=1&rel=0&modestbranding=1&playsinline=1&origin=${origin}`
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`
}

function onPlayClick(id) {
  // Souris : setPointerCapture avale le click. On a déjà lancé la lecture
  // dans pointerup, ce clic-ci est un doublon (le tactile, lui, l'envoie).
  if (suppressClick) {
    suppressClick = false
    return
  }
  play(id)
}

function onPointerDown(event) {
  if (event.target.closest('iframe')) return
  pressedId = event.target.closest('[data-short-id]')?.dataset.shortId ?? null
  pointerId = event.pointerId
  startX = event.clientX
  startOffset = offset.value
  dragMoved = false
  tween?.kill()
  event.currentTarget.setPointerCapture(pointerId)
}

function onPointerMove(event) {
  if (pointerId !== event.pointerId) return
  const dx = event.clientX - startX
  offset.value = startOffset + dx
}

function onPointerUp(event) {
  if (pointerId !== event.pointerId) return
  const dx = event.clientX - startX
  const id = pressedId
  pointerId = null
  pressedId = null
  if (Math.abs(dx) > 56) {
    dragMoved = true
    go(dx < 0 ? 1 : -1)
    return
  }
  dragMoved = false
  place(index.value, false)
  if (!id) return
  // Le click souris ne part pas après un setPointerCapture. On lance ici.
  suppressClick = true
  play(id)
}

function onKeydown(event) {
  if (event.key === 'ArrowRight') go(1)
  if (event.key === 'ArrowLeft') go(-1)
}

onMounted(() => {
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  measure()
  resizeObserver = new ResizeObserver(measure)
  resizeObserver.observe(viewport.value)
})

onUnmounted(() => {
  tween?.kill()
  resizeObserver?.disconnect()
})
</script>

<template>
  <div id="jeu" class="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
    <div class="mx-auto mb-8 flex max-w-6xl items-end justify-between gap-6 px-5 md:px-8">
      <div>
        <p class="font-hud text-sm font-semibold uppercase tracking-[0.32em] text-sea">
          Shorts
        </p>
        <h3 class="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
          ChudBalls
        </h3>
      </div>
      <p class="hidden max-w-xs text-right text-sm leading-relaxed text-ink/75 md:block">
        Vidéos courtes de ChudBalls.
      </p>
    </div>

    <div
      ref="viewport"
      class="cursor-grab overflow-hidden touch-pan-y active:cursor-grabbing"
      tabindex="0"
      aria-roledescription="carrousel"
      aria-label="Shorts de ChudBalls"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKeydown"
    >
      <div
        class="flex items-center"
        :style="{
          gap: `${gap}px`,
          transform: `translate3d(${offset}px, 0, 0)`,
        }"
      >
        <article
          v-for="(video, i) in videos"
          :key="video.id"
          class="shrink-0 origin-center transition-[transform,opacity] duration-500"
          :class="i === index ? 'scale-100 opacity-100' : 'scale-[0.9] opacity-70'"
          :style="{ width: `${cardWidth}px` }"
          :aria-hidden="i !== index"
        >
          <div
            class="rounded-[1.7rem] p-[3px] shadow-[0_30px_70px_-36px_rgba(36,31,20,0.65)]"
            :class="i === index
              ? 'bg-gradient-to-b from-feez-purple via-feez-pink to-feez-blue'
              : 'bg-ink/15'"
          >
            <div
              class="relative overflow-hidden rounded-[1.5rem] bg-ink"
              :style="{ height: `${Math.round(cardWidth * 16 / 9)}px` }"
            >
              <iframe
                v-if="playingId === video.id"
                class="absolute inset-0 h-full w-full"
                :src="embedSrc(video.id)"
                :title="`${video.kicker} — ${video.title}`"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
              <button
                v-else
                type="button"
                class="group absolute inset-0"
                :data-short-id="video.id"
                :aria-label="`Lire ${video.title}`"
                @click="onPlayClick(video.id)"
              >
                <img
                  :src="`https://i.ytimg.com/vi/${video.id}/hq2.jpg`"
                  alt=""
                  class="h-full w-full object-cover"
                  draggable="false"
                />
                <span class="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/20" />
                <span
                  class="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-foam text-ink shadow-lg transition-transform duration-300 group-hover:scale-105"
                  aria-hidden="true"
                >
                  <span class="ml-1 block h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-ink" />
                </span>
                <span class="absolute right-4 bottom-4 left-4 text-left">
                  <span class="block font-hud text-xs font-semibold uppercase tracking-[0.28em] text-sand">
                    {{ video.kicker }}
                  </span>
                  <span class="mt-1 block font-display text-2xl font-extrabold text-foam">
                    {{ video.title }}
                  </span>
                </span>
              </button>
            </div>
          </div>
          <p class="mt-3 px-2 text-sm text-ink/70">
            {{ video.note }}
          </p>
        </article>
      </div>
    </div>

    <div class="mx-auto mt-6 flex max-w-6xl items-center justify-between px-5 md:px-8">
      <p class="font-hud text-sm font-semibold tracking-[0.28em] text-ink/70">
        {{ String(index + 1).padStart(2, '0') }} / {{ String(videos.length).padStart(2, '0') }}
      </p>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-full bg-foam/90 text-ink shadow-sm transition-transform hover:scale-105"
          aria-label="Short précédent"
          @click="go(-1)"
        >
          <span aria-hidden="true" class="text-lg leading-none">←</span>
        </button>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-full bg-ink text-foam shadow-sm transition-transform hover:scale-105"
          aria-label="Short suivant"
          @click="go(1)"
        >
          <span aria-hidden="true" class="text-lg leading-none">→</span>
        </button>
      </div>
    </div>
  </div>
</template>
