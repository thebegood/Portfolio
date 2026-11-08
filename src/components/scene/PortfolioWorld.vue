<script setup>
/**
 * Scène de fond : caméra, lumières, sol, brouillard.
 * Le décor vient de <IdleKnot /> : public/models/sceneassets.glb.
 *
 * Chaque frame, on interpole les couleurs selon sceneMood.progress
 * (écrit par le ScrollTrigger de App.vue sur le bandeau #bascule).
 */
import { Color, Fog } from 'three'
import { useLoop, useTresContext } from '@tresjs/core'
import { palette } from '@/data/palette.js'
import { sceneMood } from '@/composables/useSceneMood.js'
import IdleKnot from './IdleKnot.vue'
import { ref } from 'vue'

const beach = {
  clear: new Color(palette.beach.clear),
  fog: new Color(palette.beach.fog),
  sun: new Color(palette.beach.sun),
  fill: new Color(palette.beach.fill),
  ambient: new Color(palette.beach.ambient),
  floor: new Color(palette.beach.floor),
}

const bunker = {
  clear: new Color(palette.bunker.clear),
  fog: new Color(palette.bunker.fog),
  sun: new Color(palette.bunker.sun),
  fill: new Color(palette.bunker.fill),
  ambient: new Color(palette.bunker.ambient),
  floor: new Color(palette.bunker.floor),
}

const clearColor = new Color(palette.beach.clear)
const fogColor = new Color(palette.beach.fog)
const sunColor = new Color(palette.beach.sun)
const fillColor = new Color(palette.beach.fill)
const ambientColor = new Color(palette.beach.ambient)
const floorColor = new Color(palette.beach.floor)

const floorRotation = [-Math.PI / 2, 0, 0]

const ambientRef = ref(null)
const sunRef = ref(null)
const fillRef = ref(null)
const practicalRef = ref(null)
const bloodRef = ref(null)
const floorMatRef = ref(null)
const toonKeyRef = ref(null)

const { scene, camera } = useTresContext()
const { onBeforeRender } = useLoop()

let booted = false

function bootScene() {
  if (booted || !scene.value) return
  scene.value.background = clearColor
  scene.value.fog = new Fog(palette.beach.fog, 12, 28)
  booted = true
}

bootScene()

onBeforeRender((state) => {
  bootScene()
  if (!scene.value?.fog) return

  const elapsed = state?.elapsed ?? 0
  const t = sceneMood.progress
  const scroll = sceneMood.scroll

  clearColor.copy(beach.clear).lerp(bunker.clear, t)
  fogColor.copy(beach.fog).lerp(bunker.fog, t)
  sunColor.copy(beach.sun).lerp(bunker.sun, t)
  fillColor.copy(beach.fill).lerp(bunker.fill, t)
  ambientColor.copy(beach.ambient).lerp(bunker.ambient, t)
  floorColor.copy(beach.floor).lerp(bunker.floor, t)

  scene.value.fog.color.copy(fogColor)
  scene.value.fog.near = 12 - t * 5
  scene.value.fog.far = 28 - t * 12

  const cam = camera.activeCamera.value
  if (cam) {
    // Regard légèrement vers le haut : le ciel occupe le haut de l'écran
    // (là où est le titre), le sable le bas.
    // -60° autour de l'axe Y, pivot sur le décor (mêmes X/Z que IdleKnot).
    // On tourne la position et le point visé ensemble, sinon le personnage sort du cadre.
    // lookAt écrase toute rotation posée à la main.
    const pivotX = 1.35
    const pivotZ = -1.15
    const yaw = -Math.PI / 3
    const cos = Math.cos(yaw)
    const sin = Math.sin(yaw)
    const spin = (x, z) => {
      const dx = x - pivotX
      const dz = z - pivotZ
      return [pivotX + dx * cos - dz * sin, pivotZ + dx * sin + dz * cos]
    }
    // Balancement idle : un tour en ~22 s, assez ample pour se lire
    // derrière le titre. Le point visé bouge peu, le personnage reste cadré.
    const sway = Math.sin(elapsed * 0.28)
    const bob = Math.sin(elapsed * 0.2)
    const baseX = 0.15 + sway * 1.35
    const baseY = 1.55 - scroll * 0.8 + t * 0.2 + bob * 0.28
    const baseZ = 6.8 - t * 1.05 + Math.cos(elapsed * 0.28) * 0.85
    const [x, z] = spin(baseX, baseZ)
    const [lookX, lookZ] = spin(0.25 + sway * 0.18, bob * 0.12)
    cam.position.set(x, baseY, z)
    cam.lookAt(lookX, 0.35 + bob * 0.08, lookZ)
    // Le mesh "body" est sur le calque 1. Sans ça, la caméra ne le dessine pas.
    cam.layers.enable(1)
  }

  if (sunRef.value) {
    sunRef.value.color.copy(sunColor)
    sunRef.value.intensity = 2.5 - t * 1.7
  }
  if (fillRef.value) {
    fillRef.value.color.copy(fillColor)
    fillRef.value.intensity = 0.9 - t * 0.55
  }
  if (ambientRef.value) {
    ambientRef.value.color.copy(ambientColor)
    ambientRef.value.intensity = 0.62 - t * 0.48
  }
  // Lampe ambre + lampe sang : éteintes sur la plage, allumées dans le bunker.
  if (practicalRef.value) practicalRef.value.intensity = t * 6
  if (bloodRef.value) bloodRef.value.intensity = t * 3.2
  if (floorMatRef.value) floorMatRef.value.color.copy(floorColor)
  // Une seule direction : les bandes du MeshToonMaterial restent lisibles.
  // Elle est sur le calque 1, donc elle n'éclaire pas la chaise ni le sable.
  if (toonKeyRef.value) {
    toonKeyRef.value.layers.set(1)
    toonKeyRef.value.intensity = 2.3 - t * 1.4
  }
})
</script>

<template>
  <!--
    DEBUG D'UN .glb
    1. Retire `pointer-events-none` du wrapper dans SceneCanvas.vue.
    2. import { OrbitControls } from '@tresjs/cientos'
    3. Ajoute <OrbitControls /> ici.
    4. Supprime cam.lookAt / cam.position dans onBeforeRender.

    POST-PROCESS (bloom, grain, color grade)
    useTresContext().renderer.replaceRenderFunction est le point d'entrée
    d'un EffectComposer. Branche-le dans ce fichier, pas dans App.vue.
    Le matériau du mesh, lui, se remplace dans IdleKnot.vue.
  -->
  <TresPerspectiveCamera :position="[7.63, 1.55, 3.86]" :look-at="[1.8, 0.35, 0.38]" :fov="36" :near="0.1" :far="60" />

  <TresAmbientLight ref="ambientRef" color="#fff4d8" :intensity="0.62" />
  <TresDirectionalLight ref="sunRef" :position="[5, 7, 4]" :intensity="2.5" color="#ffe3a3" />
  <TresDirectionalLight ref="fillRef" :position="[-5, 2.4, -2]" :intensity="0.9" color="#3ec4e4" />
  <TresDirectionalLight ref="toonKeyRef" :position="[-2.4, 5.4, 4.6]" :intensity="2.3" color="#fff6ea" />
  <TresPointLight
    ref="practicalRef"
    :position="[2.2, 2.6, -0.6]"
    :intensity="0"
    color="#e3a33a"
    :distance="11"
    :decay="2"
  />
  <TresPointLight
    ref="bloodRef"
    :position="[-2.6, 0.8, 1.2]"
    :intensity="0"
    color="#a11f24"
    :distance="8"
    :decay="2"
  />

  <!--
    Sol provisoire : sable qui vire au béton avec le scroll.
    Supprime ce mesh quand ton .glb embarque son propre sol.
  -->
  <TresMesh :rotation="floorRotation" :position="[0, -1.45, 0]">
    <TresPlaneGeometry :args="[120, 120]" />
    <TresMeshStandardMaterial ref="floorMatRef" color="#f0c14b" :roughness="0.95" :metalness="0" />
  </TresMesh>

  <IdleKnot />
</template>
