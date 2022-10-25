<template>
  <div class="container mx-auto mt-4 px-4 lg:px-0">
    <div class="flex space-x-4 snap-x overflow-x-scroll scrollbar">
      <div
        v-for="movies in dataTrendingMovie"
        class="snap-center flex-[0_0_22rem] md:flex-[0_0_32rem] lg:flex-[0_0_60rem]"
      >
        <BannerMovie :movie="movies" />
      </div>
    </div>
  </div>

  <div class="container mx-auto mt-4 px-4 lg:px-0">
    <h3 class="font-semibold text-lg">Now Playing</h3>
    <div class="flex overflow-x-scroll space-x-4 scrollbar mt-2">
      <CardMovie
        v-for="movies in dataNowPlaying"
        :movie="movies"
        class="flex-[0_0_10rem]"
      />
    </div>
  </div>

  <div class="container mx-auto mt-4 px-4 lg:px-0">
    <h3 class="font-semibold text-lg">Popular</h3>
    <div class="flex overflow-x-scroll space-x-4 scrollbar mt-2">
      <CardMovie
        v-for="movies in dataPopular"
        :movie="movies"
        class="flex-[0_0_10rem]"
      />
    </div>
  </div>

  <div class="container mx-auto mt-4 px-4 lg:px-0">
    <h3 class="font-semibold text-lg">Top Rate</h3>
    <div class="flex overflow-x-scroll space-x-4 scrollbar mt-2">
      <CardMovie
        v-for="movies in dataTopRate"
        :movie="movies"
        class="flex-[0_0_10rem]"
      />
    </div>
  </div>

  <div class="container mx-auto mt-4 px-4 lg:px-0">
    <h3 class="font-semibold text-lg">Upcoming</h3>
    <div class="flex overflow-x-scroll space-x-4 scrollbar mt-2">
      <CardMovie
        v-for="movies in dataUpComing"
        :movie="movies"
        class="flex-[0_0_10rem]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { computed } from "@vue/reactivity";
import axios from "axios";

import CardMovie from "../components/CardMovie.vue";
import BannerMovie from "../components/BannerMovie.vue";

let dataNowPlaying = ref([]);
let dataPopular = ref([]);
let dataTopRate = ref([]);
let dataUpComing = ref([]);
let dataTrending = ref([]);
let currentPage = ref(1);

onMounted(() => {
  fetchData();
});

const dataTrendingMovie = computed(() => {
  return dataTrending.value.filter((movies) => {
    return movies.media_type == "movie";
  });
});

const fetchData = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage}`
    )
    .then((ress) => {
      dataNowPlaying.value = ress.data.results;
    })
    .catch((err) => {
      console.log(err);
    });

  await axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage}`
    )
    .then((ress) => {
      dataPopular.value = ress.data.results;
    })
    .catch((err) => {
      console.log(err);
    });

  await axios
    .get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage}`
    )
    .then((ress) => {
      dataTopRate.value = ress.data.results;
    })
    .catch((err) => {
      console.log(err);
    });

  await axios
    .get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage}`
    )
    .then((ress) => {
      dataUpComing.value = ress.data.results;
    })
    .catch((err) => {
      console.log(err);
    });

  await axios
    .get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }`
    )
    .then((ress) => {
      dataTrending.value = ress.data.results;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style>
.scrollbar::-webkit-scrollbar {
  width: 20px;
}

.scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}
</style>
