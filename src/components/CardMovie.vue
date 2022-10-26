<template>
  <div :class="class" :key="movie.id">
    <img
      :src="pathImg + movie.poster_path"
      :alt="movie.poster_path"
      class="rounded mb-2 w-full"
    />
    <div class="px-2 py-4">
      <router-link :to="{ path: '/detail/' + movie.id }">
        <h3 class="font-semibold hover:text-blue-500">
          {{ movie.original_title }}
        </h3>
      </router-link>
      <p class="text-slate-400">
        {{ dayjs(movie.release_date).format("MMM DD, YYYY") }}
      </p>
    </div>
  </div>
</template>

<script setup>
import * as dayjs from "dayjs";
const props = defineProps(["movie", "class"]);
const pathImg = "https://image.tmdb.org/t/p/w500";
</script>
