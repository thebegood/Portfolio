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

import { asset } from '@/asset.js'

export const beachProjects = [
  {
    id: 'physique',
    index: '01',
    title: 'Multijoueur',
    kicker: 'Expérimentation',
    year: '2026',
    role: 'Réseau · Synchronisation des joueurs/balles',
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
    tags: ['Game Feel', 'Feedback'],
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
    role: 'Jeu vidéo 2 · 4 semaines',
    summary:
      'Projet de quatre semaines pour le cours Jeu vidéo 2 du cégep. Mode à manches dans deux maps différentes : Maison et Laverie. Quatre armes différentes, des hordes et des barricades renforçables',
    tags: ['Cégep', 'Manches', 'Armes'],
    accent: 'bg-perk',
    span: 'md:col-span-12',
    image: asset('projects/Zombie_weapons.png'),
    weapons: [
      {
        name: 'Fusil d’assaut',
        note: 'Dur à manier à cause de son recul, mais très efficace si bien maitrisé.',
      },
      {
        name: 'Fusil à pompe',
        note: 'Dévastateur et très efficace à courte portée.',
      },
      {
        name: 'Fusil de précision',
        note: 'Long, précis et mortel. Vient avec une lunette de visée.',
      },
      {
        name: 'Pistolet',
        note: 'Petit, rapide et efficace.',
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
    title: 'Navigation des ennemis',
    kicker: 'Expérimentation',
    year: '2025',
    role: 'IA · spawn',
    summary:
      'Implémentation d\'une IA pour les ennemis, qui se déplace de manière autonome et attaque le joueur.',
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
    role: 'Gameplay · Défense',
    summary:
      'Points d\'apparition des ennemis. En maintenant la touche E, la barricade se renforce au fil du temps.',
    tags: ['Boucle de jeu', 'Espace'],
    accent: 'bg-blood',
    span: 'md:col-span-6',
    diorama: null,
  },
]
