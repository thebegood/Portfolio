/**
 * Contenu des cartes. Tout est un placeholder : remplace titres, résumés,
 * tags, et ajoute tes captures dans /public/projects.
 *
 * diorama: 'beach' | 'bunker' | null
 *   Bloc de couleurs en attendant une vraie image. Le composant ProjectCard
 *   indique exactement où poser le <img>.
 *
 * accent: classe Tailwind du point de couleur (tokens du @theme).
 * span:    placement dans la grille 12 colonnes.
 */

export const beachProjects = [
  {
    id: 'physique',
    index: '01',
    title: 'Contrôleur',
    kicker: 'Expérimentation',
    year: '2026',
    role: 'Physique · mouvement',
    summary:
      'Implémentation de mécaniques de jeu satisfaisantes. Remplace ce texte par ton prototype.',
    tags: ['Physique', 'Mouvement'],
    accent: 'bg-sea-mid',
    span: 'md:col-span-6',
    diorama: null,
  },
  {
    id: 'reseau',
    index: '02',
    title: 'État répliqué',
    kicker: 'Expérimentation',
    year: '2026',
    role: 'Réseau · prédiction',
    summary:
      'Snapshot d’état, prédiction client et correction. Remplace ce texte par ton prototype.',
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
    year: '2026',
    role: 'Gameplay · manches · hordes',
    summary:
      'Mode à manches dans un bunker : points, barricades, hordes qui accélèrent, lumières qui lâchent. Remplace le nom, les systèmes et la capture. L’ambiance vise un mode zombies souterrain, pas une licence.',
    tags: ['Manches', 'Hordes', 'Bunker'],
    accent: 'bg-perk',
    span: 'md:col-span-12',
    diorama: 'bunker',
  },
  {
    id: 'hordes',
    index: '04',
    title: 'Navigation des hordes',
    kicker: 'Expérimentation',
    year: '2026',
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
    index: '05',
    title: 'Barricades',
    kicker: 'Expérimentation',
    year: '2026',
    role: 'Gameplay · pression',
    summary:
      'Points d’entrée, réparation, et une pression qui tourne autour du joueur. Remplace ce texte par ton prototype.',
    tags: ['Boucle de jeu', 'Espace'],
    accent: 'bg-blood',
    span: 'md:col-span-6',
    diorama: null,
  },
]
