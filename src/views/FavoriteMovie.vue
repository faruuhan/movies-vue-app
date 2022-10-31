<template>
  <div class="container mx-auto my-4">
    <h3 class="font-semibold text-xl px-2">Favorite</h3>
    <div class="flex flex-wrap gap-y-2 mt-2">
      <CardMovie
        v-for="movies in dataFavorite"
        :movie="movies"
        :addFavorite="handleFavorite"
        :favorited="store.state.favorite"
        class="w-1/2 px-2 md:w-3/12 lg:w-2/12"
      />
    </div>
  </div>
</template>

<script setup>
import CardMovie from "../components/CardMovie.vue";
import { toRaw } from "vue";
import { useStore } from "vuex";
const store = useStore();

const dataFavorite = toRaw(store.state.favorite);

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
</script>
