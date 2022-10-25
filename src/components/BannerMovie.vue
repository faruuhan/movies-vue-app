<template>
  <div class="relative rounded-xl overflow-auto" :key="movie.id">
    <img :src="pathImg + movie.backdrop_path" alt="" />
    <div
      class="absolute h-full w-full bg-slate-700 opacity-70 top-0 lef-0"
    ></div>
    <div class="absolute top-3 left-5 bg-neutral-600 px-4 rounded-lg">
      <h3 class="font-semibold tracking-widest text-white">#Trending</h3>
    </div>
    <div class="absolute top-2/4 lg:top-3/4 left-5 right-5 space-y-2">
      <router-link :to="{ path: '/detail/' + movie.id }">
        <h1
          class="text-white font-bold text-xl md:text-2xl lg:text-4xl hover:text-white/70"
        >
          {{ movie.original_title }} ({{ movie.release_date.split("-")[0] }})
        </h1>
      </router-link>
      <p class="text-gray-300 hidden md:block tracking-wide">
        {{ movie.overview.substring(0, 250) + "..." }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["movie"]);
const pathImg = "https://image.tmdb.org/t/p/original";
</script>
