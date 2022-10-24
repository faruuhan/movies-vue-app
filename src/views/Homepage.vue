<template>
  <div class="flex flex-wrap gap-2">
    <div class="w-[12rem]" v-for="movies in dataMovies" :key="movies.id">
      <img
        :src="pathImg + movies.poster_path"
        :alt="movies.poster_path"
        class="rounded mb-2"
      />
      <h3 class="font-semibold">{{ movies.original_title }}</h3>
      <p class="text-slate-400">
        {{ dayjs(movies.release_date).format("MMM DD, YYYY") }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import * as dayjs from "dayjs";

let pathImg = ref("https://image.tmdb.org/t/p/w500");
let dataMovies = ref([]);
let currentPage = ref(1);

onMounted(() => {
  fetchData();
  console.log(import.meta.env.API_APP_KEY);
});

const fetchData = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage}`
    )
    .then((ress) => {
      dataMovies.value = ress.data.results;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
