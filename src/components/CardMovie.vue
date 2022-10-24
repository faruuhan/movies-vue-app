<template>
  <div class="w-[12rem]" :key="movie.id">
    <img
      :src="pathImg + movie.poster_path"
      :alt="movie.poster_path"
      class="rounded mb-2"
    />
    <h3 class="font-semibold">{{ movie.original_title }}</h3>
    <p class="text-slate-400">
      {{ dayjs(movie.release_date).format("MMM DD, YYYY") }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as dayjs from "dayjs";
const props = defineProps(["movie"]);
const pathImg = ref("https://image.tmdb.org/t/p/w500");
</script>
