<template>
  <div class="bg-neutral-700 text-white py-5 drop-shadow-lg">
    <div class="container mx-auto px-4 lg:px-0 flex justify-between">
      <div>
        <router-link :to="{ path: '/' }">
          <h3 class="font-semibold hover:text-neutral-500 tracking-wider">
            vue-movies
          </h3>
        </router-link>
      </div>
      <div>
        <router-link :to="{ path: '/favorite' }">
          <p class="hover:text-neutral-500 tracking-wider">Favorite</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
