<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  tone: {
    type: String,
    default: 'beach',
  },
})

function embedSrc(id) {
  // Même adresse que le oEmbed YouTube. nocookie + ?origin laissait un cadre
  // noir : le lecteur ne se construisait pas, donc le clic ne lançait rien.
  const params = 'rel=0&modestbranding=1&playsinline=1'
  return `https://www.youtube.com/embed/${id}?${params}`
}

const hasVideoSlot = props.project.videoId !== undefined
</script>

<template>
  <article
    :id="project.id"
    data-project-card
    class="flex flex-col rounded-3xl p-6 md:p-8"
    :class="[
      project.span,
      tone === 'beach'
        ? 'bg-foam/92 text-ink shadow-[0_24px_50px_-32px_rgba(36,31,20,0.55)]'
        : 'border border-bone/10 bg-concrete/90 text-bone',
    ]"
  >
    <!--
      VISUEL
      project.image pointe vers un fichier de public/ (ex. /projects/photo.png).
      Sans image, le filet d'accent tient lieu de visuel.
    -->
    <figure v-if="project.image" class="mb-6 overflow-hidden rounded-2xl bg-void">
      <img
        :src="project.image"
        alt="Menu du jeu : niveaux House et Laundry, et les quatre armes au choix."
        class="h-auto max-h-[28rem] w-full object-contain"
      />
    </figure>

    <ul
      v-if="project.weapons?.length"
      class="mb-6 grid gap-3 sm:grid-cols-2"
    >
      <li
        v-for="weapon in project.weapons"
        :key="weapon.name"
        class="rounded-2xl border border-amber/30 bg-void/70 px-4 py-3"
      >
        <p class="font-hud text-sm font-semibold uppercase tracking-[0.18em] text-amber">
          {{ weapon.name }}
        </p>
        <p class="mt-1 text-sm leading-relaxed text-bone/80">
          {{ weapon.note }}
        </p>
      </li>
    </ul>

    <div v-else class="mb-6 flex items-center gap-3" aria-hidden="true">
      <span class="h-1.5 w-10 rounded-full" :class="project.accent" />
      <span
        class="h-px flex-1"
        :class="tone === 'beach' ? 'bg-ink/10' : 'bg-bone/10'"
      />
    </div>

    <div class="flex items-baseline justify-between gap-4">
      <p
        class="font-hud text-sm font-semibold uppercase tracking-[0.28em]"
        :class="tone === 'beach' ? 'text-ink/55' : 'text-amber'"
      >
        {{ project.kicker }}
      </p>
      <p
        class="font-display text-sm font-bold"
        :class="tone === 'beach' ? 'text-feez-blue' : 'text-perk'"
      >
        {{ project.index }}
      </p>
    </div>

    <h3 class="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
      {{ project.title }}
    </h3>

    <p
      class="mt-2 text-sm"
      :class="tone === 'beach' ? 'text-ink/60' : 'text-bone/55'"
    >
      {{ project.role }} · {{ project.year }}
    </p>

    <p class="mt-4 max-w-2xl text-base leading-relaxed" :class="tone === 'beach' ? 'text-ink/85' : 'text-bone/85'">
      {{ project.summary }}
    </p>

    <div v-if="hasVideoSlot" class="mt-6 overflow-hidden rounded-2xl bg-void">
      <iframe
        v-if="project.videoId"
        class="aspect-video w-full"
        :src="embedSrc(project.videoId)"
        :title="`${project.title} — vidéo`"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
      <div
        v-else
        class="relative flex aspect-video flex-col items-center justify-center gap-3 border border-dashed border-amber/40"
        role="img"
        aria-label="Lecteur YouTube en attente, format long"
      >
        <span class="grid h-16 w-16 place-items-center rounded-full border border-amber/50 text-amber" aria-hidden="true">
          <span class="ml-1 block h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-amber" />
        </span>
        <p class="font-hud text-sm font-semibold uppercase tracking-[0.28em] text-amber">
          YouTube · format long
        </p>
        <p class="max-w-xs text-center text-sm text-bone/70">
          La vidéo de la remise viendra ici.
        </p>
      </div>
    </div>

    <ul class="mt-6 flex flex-wrap gap-2">
      <li
        v-for="tag in project.tags"
        :key="tag"
        class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
        :class="tone === 'beach' ? 'bg-sand/70 text-ink' : 'bg-void text-bone'"
      >
        <span class="h-1.5 w-1.5 rounded-full" :class="project.accent" />
        {{ tag }}
      </li>
    </ul>
  </article>
</template>
