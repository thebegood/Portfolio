<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
  tone: {
    type: String,
    default: 'beach',
  },
})
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
      Remplace le diorama (ou le filet d'accent) par ta capture :
      <img
        src="/projects/capture.jpg"
        alt=""
        class="mb-6 h-52 w-full rounded-2xl object-cover"
      />
      Fichiers dans public/projects/. Le diorama n'est qu'un code couleur d'attente.
    -->
    <div
      v-if="project.diorama === 'bunker'"
      class="relative mb-6 h-52 overflow-hidden rounded-2xl bg-void"
      aria-hidden="true"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-void via-fog to-concrete" />
      <div class="absolute inset-x-8 top-1/2 h-px bg-amber/80" />
      <div class="absolute top-1/2 left-1/3 h-28 w-28 -translate-y-1/2 rounded-full bg-perk/15 blur-3xl" />
      <p class="absolute top-5 left-5 font-hud text-sm font-semibold uppercase tracking-[0.42em] text-perk">
        Manche 01
      </p>
      <p class="absolute right-3 bottom-3 font-hud text-[10px] font-semibold uppercase tracking-[0.28em] text-amber/90">
        Visuel à remplacer
      </p>
    </div>

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
