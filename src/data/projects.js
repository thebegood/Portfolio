/**
 * Contenu des cartes. Tout est un placeholder : remplace titres, résumés,
 * tags, et ajoute tes captures dans /public/projects.
 *
 * diorama n'est plus utilisé. Une carte avec `image` affiche ce fichier
 * (chemin public, ex. /projects/photo.png). `weapons` ajoute une légende.
 *
 * accent: classe Tailwind du point de couleur (tokens du @theme).
 * span:    placement dans la grille 12 colonnes.
 */

import { IndirectStorageBufferAttribute } from "three/webgpu"

export const beachProjects = [
  {
    id: 'physique',
    index: '01',
    title: 'Multijoueur',
    kicker: 'Expérimentation',
    year: '2026',
    role: 'Physique · mouvement',
    summary:
      'Le plus gros défi de ce projet a été de mettre en place le système de multijoueur, qui complique grandement le développement du jeu. Chaque petite action du jeu devait être prise en compte pour le multijoueur.',
    tags: ['Steamworks API', 'Synchronisation'],
    accent: 'bg-sea-mid',
    span: 'md:col-span-6',
    diorama: null,
  },
  {
    id: 'reseau',
    index: '02',
    title: 'Mécanique de Smash',
    kicker: 'Expérimentation',
    year: '2026',
    role: 'Game Feel',
    summary:
      'Implémentation de mécaniques de jeu satisfaisantes. Possibilité de «Smasher» une balle si le joueur a le bon timing, ce qui provoque un feedback satisfaisant et offre un avantage considérable si le joueur vise la balle «Smashée» sur un autre joueur. ',
    tags: ['Réseau', 'Prédiction'],
    accent: 'bg-feez-purple',
    span: 'md:col-span-6',
    diorama: null,
  },
]

export const bunkerProjects = [
  {
    id: 'zombies',
    index: '03',
    title: 'Projet zombies',
    kicker: 'Jeu présenté',
    year: '2025',
    role: 'Jeu vidéo 2 · quatre semaines',
    summary:
      'Projet de quatre semaines pour le cours Jeu vidéo 2 du cégep. Mode à manches dans un bunker : quatre armes, des niveaux courts, et une horde qui se resserre tant que la manche n’est pas bouclée.',
    tags: ['Cégep', 'Manches', 'Armes'],
    accent: 'bg-perk',
    span: 'md:col-span-12',
    image: '/projects/Zombie_weapons.png',
    weapons: [
      {
        name: 'Fusil d’assaut',
        note: 'Le débit. Il tient une file de zombies tant que le chargeur suit.',
      },
      {
        name: 'Fusil à pompe',
        note: 'Le contact. Un coup large quand la horde est déjà dans la pièce.',
      },
      {
        name: 'Fusil de précision',
        note: 'La ligne de vue. Un tir, une cible, avant qu’elle ne traverse.',
      },
      {
        name: 'Pistolet',
        note: 'Le secours. Court, rapide, pour finir un chargeur vide.',
      },
    ],
    // Id YouTube du format long, la partie après watch?v= ou youtu.be/.
    // Chaîne vide : le cadre d'attente reste affiché.
    videoId: 'XzodV9v1-kI',
  },
  {
    id: 'camera',
    index: '04',
    title: 'Caméra',
    kicker: 'Expérimentation',
    year: '2025',
    role: 'Regard · Poids · Recul',
    summary:
      'Ayant étudié plusieurs jeu de tir à la première personne, nous cherchions à implémenter une caméra digne du réalisme des plus grands jeux de l\'industrie. La caméra réagit à chaque déplacement, ainsi qu\'au tir de l\'arme sélectionnée, chaque arme ayant un effet différent sur la caméra.',
    tags: ['Tilt', 'Saut', 'Recul'],
    accent: 'bg-amber',
    span: 'md:col-span-12',
    diorama: null,
  },
  {
    id: 'hordes',
    index: '05',
    title: 'Navigation des hordes',
    kicker: 'Expérimentation',
    year: '2025',
    role: 'IA · spawn',
    summary:
      'Slots d’attaque, navigation et cadence de spawn qui se resserre à chaque manche. Remplace ce texte par ton prototype.',
    tags: ['IA', 'Spawn'],
    accent: 'bg-amber',
    span: 'md:col-span-6',
    diorama: null,
  },
  {
    id: 'barricades',
    index: '06',
    title: 'Barricades',
    kicker: 'Expérimentation',
    year: '2025',
    role: 'Gameplay · pression',
    summary:
      'Points d’entrée, réparation, et une pression qui tourne autour du joueur. Remplace ce texte par ton prototype.',
    tags: ['Boucle de jeu', 'Espace'],
    accent: 'bg-blood',
    span: 'md:col-span-6',
    diorama: null,
  },
]
