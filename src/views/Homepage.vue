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
    <div class="flex justify-between">
      <h3 class="font-semibold text-xl">Now Playing</h3>
      <router-link
        :to="{ path: '/now_playing' }"
        class="text-blue-500 hover:opacity-70 font-medium"
        >More</router-link
      >
    </div>
    <div class="flex overflow-x-scroll space-x-4 scrollbar mt-2">
      <CardMovie
        v-for="movies in state.nowPlaying"
        :movie="movies"
        :addFavorite="handleFavorite"
        :favorited="store.state.favorite"
        class="flex-[0_0_10rem]"
      />
    </div>
  </div>

  <div class="container mx-auto mt-4 px-4 lg:px-0">
    <div class="flex justify-between">
      <h3 class="font-semibold text-xl">Popular</h3>
      <router-link
        :to="{ path: '/popular' }"
        class="text-blue-500 hover:opacity-70 font-medium"
        >More</router-link
      >
    </div>
    <div class="flex overflow-x-scroll space-x-4 scrollbar mt-2">
      <CardMovie
        v-for="movies in state.popular"
        :movie="movies"
        :addFavorite="handleFavorite"
        :favorited="store.state.favorite"
        class="flex-[0_0_10rem]"
      />
    </div>
  </div>

  <div class="container mx-auto mt-4 px-4 lg:px-0">
    <div class="flex justify-between">
      <h3 class="font-semibold text-xl">Top Rated</h3>
      <router-link
        :to="{ path: '/top_rated' }"
        class="text-blue-500 hover:opacity-70 font-medium"
        >More</router-link
      >
    </div>
    <div class="flex overflow-x-scroll space-x-4 scrollbar mt-2">
      <CardMovie
        v-for="movies in state.topRated"
        :movie="movies"
        :addFavorite="handleFavorite"
        :favorited="store.state.favorite"
        class="flex-[0_0_10rem]"
      />
    </div>
  </div>

  <div class="container mx-auto mt-4 px-4 lg:px-0">
    <div class="flex justify-between">
      <h3 class="font-semibold text-xl">Upcoming</h3>
      <router-link
        :to="{ path: '/upcoming' }"
        class="text-blue-500 hover:opacity-70 font-medium"
        >More</router-link
      >
    </div>
    <div class="flex overflow-x-scroll space-x-4 scrollbar mt-2">
      <CardMovie
        v-for="movies in state.upComing"
        :movie="movies"
        :addFavorite="handleFavorite"
        :favorited="store.state.favorite"
        class="flex-[0_0_10rem]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";

import CardMovie from "../components/CardMovie.vue";
import BannerMovie from "../components/BannerMovie.vue";

const state = reactive({
  nowPlaying: [],
  popular: [],
  topRated: [],
  upComing: [],
  trending: [],
});

const currentPage = ref(1);
const store = useStore();

onMounted(() => {
  fetchData();
  store.commit("setFavorite", JSON.parse(localStorage.getItem("data")));
});

const dataTrendingMovie = computed(() => {
  const { trending } = state;
  return trending.filter((movies) => {
    return movies.media_type == "movie";
  });
});

const handleFavorite = (item) => {
  let favorite = JSON.parse(localStorage.getItem("data"));
  if (favorite) {
    let findIndex = favorite.findIndex((i) => i.id === item.id);
    if (findIndex > -1) {
      favorite.splice(findIndex, 1);
      localStorage.removeItem("data");
      localStorage.setItem("data", JSON.stringify(favorite));
    } else {
      favorite.push(item);
      localStorage.setItem("data", JSON.stringify(favorite));
    }
  } else {
    localStorage.setItem("data", JSON.stringify([item]));
  }
  store.commit("setFavorite", JSON.parse(localStorage.getItem("data")));
};

const fetchData = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage.value}`
    )
    .then((ress) => {
      const { results } = ress.data;
      state.nowPlaying = results;
    })
    .catch((err) => {
      console.log(err);
    });

  await axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage.value}`
    )
    .then((ress) => {
      const { results } = ress.data;
      state.popular = results;
    })
    .catch((err) => {
      console.log(err);
    });

  await axios
    .get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage.value}`
    )
    .then((ress) => {
      const { results } = ress.data;
      state.topRated = results;
    })
    .catch((err) => {
      console.log(err);
    });

  await axios
    .get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&language=en-US&page=${currentPage.value}`
    )
    .then((ress) => {
      const { results } = ress.data;
      state.upComing = results;
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
      const { results } = ress.data;
      state.trending = results;
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
