<template>
  <div class="bg-white">
    <div class="relative px-6 lg:px-8">
      <div class="mx-auto max-w-2xl py-16 sm:py-12">
        <div class="text-center mb-8">
          <img src="../assets/images/nou.png" class="mx-auto w-32 h-32 sm:w-40 sm:h-40" />
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">脳トレタイピング</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600"></p>
        </div>
        <div class="text-center text-lg flex flex-col space-y-3 w-full sm:w-2/3 mx-auto">
          <router-link to="/game1" class="text-white bg-indigo-400 px-3 py-2 rounded shadow-lg hover:bg-indigo-500">1. 文字の色名を答える脳トレ →</router-link>
          <router-link to="/game2" class="text-white bg-indigo-400 px-3 py-2 rounded shadow-lg hover:bg-indigo-500">2. 文字の名前を答える脳トレ →</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
