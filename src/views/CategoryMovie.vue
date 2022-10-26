<template>
  <div class="container mx-auto mt-4 px-4 lg:px-0">
    <h3 class="font-semibold text-xl px-2">
      {{ titleCategory }}
    </h3>
    <div class="flex flex-wrap gap-y-2 mt-2">
      <CardMovie
        v-for="movies in dataMovies"
        :movie="movies"
        class="w-1/2 px-2 md:w-3/12 lg:w-2/12"
      />
    </div>

    <div class="flex justify-center my-2" v-if="!noData">
      <button
        class="bg-neutral-700 px-5 py-2 text-white font-semibold rounded-2xl hover:opacity-80"
        @click="currentPage++"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import CardMovie from "../components/CardMovie.vue";
import { computed } from "@vue/reactivity";

const route = useRoute();
const { category } = route.params;
let dataMovies = ref([]);
let currentPage = ref(1);
let noData = ref(false);

onMounted(() => {
  fetchData();
});

watch(currentPage, () => {
  fetchData();
});

const titleCategory = computed(() =>
  category == "now_playing"
    ? "Now Playing"
    : category == "popular"
    ? "Polpular"
    : category == "top_rated"
    ? "Top Rated"
    : "Upcoming"
);

const fetchData = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage.value}`
    )
    .then((ress) => {
      const { results } = ress.data;
      const dataTemp = [...dataMovies.value];
      dataTemp.push(...results);
      if (results.length == 0) noData.value = true;
      else {
        dataMovies.value = dataTemp;
      }
    })
    .catch((err) => console.log(err));
};
</script>
