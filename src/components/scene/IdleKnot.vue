<script setup>
/**
 * Décor chargé depuis public/models/sceneassets.glb.
 * Pour changer de fichier, remplace MODEL_URL (le fichier doit rester dans public/).
 *
 * Le groupe englobant recadre le modèle sans toucher à son échelle d'export :
 * la base pose sur le sol (FLOOR_Y) et la hauteur tient dans TARGET_HEIGHT.
 * Les nœuds du fichier sont en coordonnées de scène (centaines d'unités,
 * parent à l'échelle 0.01), donc on ne les pose pas tels quels devant la caméra.
 *
 * Le personnage est le mesh skinné "body", enfant de l'armature (13 os).
 * La pose est celle des os dans le fichier : il n'y a pas de clip,
 * donc rien à jouer avec un AnimationMixer. Un nouvel export remplace
 * la pose au rechargement.
 * CharLightBlue arrive sans texture, avec une émission rouge.
 * On le remplace par un MeshToonMaterial bleu : la rampe cel (3 bandes,
 * NearestFilter) coupe la lumière en aplats. L'émission rouge est jetée
 * avec l'ancien matériau. "body" passe sur le calque 1 : seule la lampe
 * cel de PortfolioWorld l'éclaire, sinon les trois lampes de la plage
 * effacent les aplats.
 * Le contour blanc est un second mesh skinné, poussé le long des normales
 * avant le skinning, dessiné en BackSide. Le reflet est un sprite sur l'os
 * "head", du côté tourné vers la caméra.
 *
 * beach_chair, plastic_bucket et plastic_fork sont exportés en
 * alphaMode BLEND alors que leur texture est opaque (alpha = 255).
 * Three coupe alors depthWrite : ils se trient comme des transparents
 * et clignotent entre eux. On les repasse opaques.
 *
 * Le cel shader de Blender ne sort pas dans le .glb. Le reste du décor
 * garde ses matériaux PBR. Seul "body" passe en toon.
 */
import { ref, watch } from 'vue'
import {
  BackSide,
  Box3,
  CanvasTexture,
  DataTexture,
  DoubleSide,
  Matrix4,
  MeshBasicMaterial,
  MeshToonMaterial,
  NearestFilter,
  RedFormat,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Vector3,
} from 'three'
import { useGLTF } from '@tresjs/cientos'
import { asset } from '@/asset.js'

// Direction caméra → personnage, dans l'espace du .glb (le cadre ne tourne pas).
const GLINT_VIEW = new Vector3(0.78, 0.55, 0.61).normalize()
// Épaisseur en unités locales du mesh (hauteur du body ≈ 5). Petit liseré.
const OUTLINE_WIDTH = 0.07

// Trois aplats : ombre, milieu, lumière. NearestFilter garde le bord net.
// Une rampe lissée redonnerait un dégradé Phong, plus le look cel.
const celRamp = new DataTexture(new Uint8Array([64, 150, 255]), 3, 1, RedFormat)
celRamp.minFilter = NearestFilter
celRamp.magFilter = NearestFilter
celRamp.generateMipmaps = false
celRamp.needsUpdate = true

const MODEL_URL = asset('models/sceneassets.glb')
const TARGET_HEIGHT = 2.7
const FLOOR_Y = -1.45
// Écarte les pieds du plan de sable. Au contact exact, le z-buffer clignote.
const GROUND_CLEARANCE = 0.03
const TARGET_X = 1.35
const TARGET_Z = -1.15

const OPAQUE_BLEND_MATERIALS = new Set(['beach_chair', 'plastic_bucket', 'plastic_fork'])

function glintTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const g = canvas.getContext('2d')
  const glow = g.createRadialGradient(32, 30, 2, 32, 32, 28)
  glow.addColorStop(0, 'rgba(255,255,255,1)')
  glow.addColorStop(0.5, 'rgba(255,255,255,1)')
  glow.addColorStop(0.72, 'rgba(255,255,255,0.2)')
  glow.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = glow
  g.fillRect(0, 0, 64, 64)
  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  return tex
}

function addOutline(body) {
  if (body.parent?.getObjectByName('body-outline')) return
  const material = new MeshBasicMaterial({
    color: '#ffffff',
    side: BackSide,
    toneMapped: false,
  })
  // `normal` est la normale de bind. Le décalage est skinné avec le sommet,
  // donc le liseré suit la pose. BackSide ne laisse voir que la silhouette.
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       transformed += normalize(normal) * ${OUTLINE_WIDTH.toFixed(4)};`,
    )
  }
  const outline = body.clone()
  outline.material = material
  outline.name = 'body-outline'
  outline.frustumCulled = false
  outline.renderOrder = -1
  body.frustumCulled = false
  body.parent.add(outline)
}

function addHeadGlint(body, root) {
  const head = root.getObjectByName('head')
  if (!head) return
  const previous = head.getObjectByName('head-glint')
  if (previous) {
    previous.parent.remove(previous)
    previous.material.map?.dispose()
    previous.material.dispose()
  }
  const joint = body.skeleton.bones.indexOf(head)
  if (joint < 0) return

  root.updateMatrixWorld(true)
  body.skeleton.update()

  const skinIndex = body.geometry.getAttribute('skinIndex')
  const skinWeight = body.geometry.getAttribute('skinWeight')
  const headInv = new Matrix4().copy(head.matrixWorld).invert()
  const vertex = new Vector3()
  const headPoints = []
  const worldPoints = []

  for (let i = 0; i < skinIndex.count; i++) {
    let weight = 0
    for (let k = 0; k < 4; k++) {
      if (skinIndex.getComponent(i, k) === joint) weight = Math.max(weight, skinWeight.getComponent(i, k))
    }
    if (weight < 0.5) continue
    body.getVertexPosition(i, vertex).applyMatrix4(body.matrixWorld)
    worldPoints.push(vertex.clone())
    headPoints.push(vertex.clone().applyMatrix4(headInv))
  }
  if (!worldPoints.length) return

  const worldCenter = new Vector3()
  for (const point of worldPoints) worldCenter.add(point)
  worldCenter.multiplyScalar(1 / worldPoints.length)

  const headCenter = new Vector3()
  for (const point of headPoints) headCenter.add(point)
  headCenter.multiplyScalar(1 / headPoints.length)

  let radius = 0
  let best = -Infinity
  const glintPos = new Vector3()
  const fromCenter = new Vector3()
  for (let i = 0; i < worldPoints.length; i++) {
    fromCenter.copy(worldPoints[i]).sub(worldCenter)
    const score = fromCenter.dot(GLINT_VIEW)
    fromCenter.copy(headPoints[i]).sub(headCenter)
    radius = Math.max(radius, fromCenter.length())
    if (score > best) {
      best = score
      glintPos.copy(headPoints[i])
    }
  }

  const glint = new Sprite(new SpriteMaterial({
    map: glintTexture(),
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  }))
  glint.name = 'head-glint'
  glint.renderOrder = 2
  fromCenter.copy(glintPos).sub(headCenter)
  if (fromCenter.lengthSq() > 0) fromCenter.normalize()
  glint.position.copy(headCenter).addScaledVector(fromCenter, radius * 1.03)
  glint.scale.set(radius * 0.42, radius * 0.3, 1)
  head.add(glint)
}

const { state } = useGLTF(MODEL_URL)
const framePosition = ref([0, 0, 0])
const frameScale = ref([1, 1, 1])

watch(state, (gltf) => {
  const root = gltf?.scene
  if (!root) return

  root.traverse((obj) => {
    if (!obj.isMesh) return
    const materials = Array.isArray(obj.material) ? obj.material : [obj.material]
    for (const material of materials) {
      if (!material) continue
      // Les atlas en cutout (palmier) disparaissent de dos sans ça.
      if (material.alphaTest > 0 || material.transparent) material.side = DoubleSide
      if (obj.name === 'body') {
        // Calque 1 : la lampe cel, pas le soleil / fill / ambiante de la plage.
        obj.layers.set(1)
        if (!material.isMeshToonMaterial) {
          obj.material = new MeshToonMaterial({
            color: '#00AAFC',
            gradientMap: celRamp,
          })
          material.dispose()
        }
        addOutline(obj)
        addHeadGlint(obj, root)
        continue
      }
      if (!OPAQUE_BLEND_MATERIALS.has(material.name)) continue
      material.transparent = false
      material.depthWrite = true
      material.needsUpdate = true
    }
  })

  root.updateMatrixWorld(true)
  const box = new Box3().setFromObject(root)
  const size = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())
  if (size.y === 0) return

  const scale = TARGET_HEIGHT / size.y
  frameScale.value = [scale, scale, scale]
  framePosition.value = [
    TARGET_X - center.x * scale,
    FLOOR_Y + GROUND_CLEARANCE - box.min.y * scale,
    TARGET_Z - center.z * scale,
  ]
}, { immediate: true })
</script>

<template>
  <TresGroup v-if="state" :position="framePosition" :scale="frameScale">
    <primitive :object="state.scene" />
  </TresGroup>
</template>
