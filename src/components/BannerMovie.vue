<template>
  <div class="relative rounded-xl overflow-auto" :key="movie.id">
    <img :src="pathImg + movie.backdrop_path" alt="" />
    <div
      class="absolute h-full w-full bg-slate-700 opacity-60 top-0 lef-0"
    ></div>
    <div class="absolute top-2/4 lg:top-3/4 left-5">
      <router-link :to="{ path: '/detail/' + movie.id }">
        <h1
          v-if="movie.media_type === 'tv'"
          class="text-white font-bold text-xl lg:text-4xl hover:text-blue-500"
        >
          {{ movie.original_name }}
        </h1>
        <h1
          v-else
          class="text-white font-bold text-xl lg:text-4xl hover:text-blue-500"
        >
          {{ movie.original_title }}
        </h1>
      </router-link>
      <p class="text-gray-300 hidden lg:block">
        {{ movie.overview.substring(0, 250) + "..." }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["movie"]);
const pathImg = "https://image.tmdb.org/t/p/original";
</script>
