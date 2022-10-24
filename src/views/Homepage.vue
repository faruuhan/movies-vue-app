<template>
  <div class="container mx-auto mt-4">
    <div class="flex flex-wrap gap-2">
      <CardMovie v-for="movies in dataMovies" :movie="movies" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import CardMovie from "./../components/CardMovie.vue";

let dataMovies = ref([]);
let currentPage = ref(1);

onMounted(() => {
  fetchData();
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
