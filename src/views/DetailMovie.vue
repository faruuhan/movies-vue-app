<template>
  <div class="container mx-auto lg:my-4">
    <div class="flex flex-wrap gap-y-2" v-if="isReady">
      <div
        class="w-full relative lg:static lg:w-4/12 lg:flex lg:justify-center"
      >
        <img
          :src="
            `https://image.tmdb.org/t/p/original` + dataMovie?.backdrop_path
          "
          class="lg:hidden"
          alt=""
        />
        <div
          class="w-full h-full absolute top-0 bg-gradient-to-r from-zinc-800 lg:hidden"
        ></div>
        <img
          :src="`https://image.tmdb.org/t/p/w500` + dataMovie?.poster_path"
          class="w-[6rem] md:w-[14rem] rounded-xl absolute top-8 md:top-12 left-4 lg:static lg:w-72"
          alt=""
        />
      </div>
      <div class="w-full px-4 lg:w-1/2 lg:px-0">
        <h1 class="text-center font-semibold text-2xl lg:text-left">
          {{ dataMovie.original_title }}
          <span class="text-black/60 font-medium"
            >({{ dataMovie.release_date.split("-")[0] }})</span
          >
        </h1>
        <div class="text-center lg:text-left">
          {{ dataMovie.release_date }} • {{ genres.join(", ") }} •
          {{ dataMovie.status }}
        </div>
        <div>
          <p class="italic text-neutral-400">{{ dataMovie.tagline }}</p>
          <h3 class="font-semibold text-lg">Overview</h3>
          <p>{{ dataMovie.overview }}</p>
          <p class="font-semibold">
            Languange
            <span class="font-normal">{{ spoken.join(", ") }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container mx-auto my-2">
    <div class="flex w-full overflow-x-auto scrollbar">
      <iframe
        width="420"
        height="315"
        v-for="video in videos"
        :id="video.id"
        :src="`https://www.youtube.com/embed/${video.key}`"
      >
      </iframe>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { id } = route.params;

let dataMovie = ref({});
let videos = ref([]);
let isReady = ref(false);

onMounted(() => {
  fetchData();
});

const genres = computed(() => {
  return dataMovie.value.genres.map((genre) => {
    return genre.name;
  });
});

const spoken = computed(() => {
  return dataMovie.value.spoken_languages.map((spoken) => {
    return spoken.name;
  });
});

const fetchData = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_API_APP_KEY
      }&append_to_response=videos`
    )
    .then((ress) => {
      const { data } = ress;
      dataMovie.value = data;
      videos.value = data.videos.results;
      isReady.value = true;
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
