<template>
  <div class="max-w-7xl mx-auto min-h-screen flex items-center flex-col">
    <div class="my-3 pb-8 w-full border-b border-gray-400">
      <router-link to="/" class="m-3 text-gray-600 underline hover:text-gray-800">←戻る</router-link>
      <h1 class="text-center text-xl font-bold mb-2">文字名を答える脳トレ</h1>
      <p class="text-gray-800 text-center">
        表示された<span class="text-lg font-bold text-red-500 underline">文字名</span>を解答してください。
      </p>
    </div>
    
    <GameComponent :questions="questions" />

    <div class="my-8 w-2/3 md:w-1/3">
      <h3 class="text-lg mb-3 underline">答え方: </h3>
      <div class="flex flex-col space-y-3">
        <div class="flex items-center justify-between px-3 space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="mr-2">あか、アカ、赤</div> → 
          <p class="text-lg font-bold">aka</p>
        </div>
        <div class="flex items-center justify-between px-3 space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="mr-2">あお、アオ、青</div> → 
          <p class="text-lg font-bold">ao</p>
        </div>
        <div class="flex items-center justify-between px-3 space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="mr-2">みどり、ミドリ、緑</div> → 
          <p class="text-lg font-bold">midori</p>
        </div>
        <div class="flex items-center justify-between px-3 space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="mr-2">き、キ、黄</div> → 
          <p class="text-lg font-bold">ki</p>
        </div>
        <div class="flex items-center justify-between px-3 space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="mr-2">くろ、クロ、黒</div> → 
          <p class="text-lg font-bold">kuro</p>
        </div>
        <div class="flex items-center justify-between px-3 space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="mr-2">しろ、シロ、白</div> → 
          <p class="text-lg font-bold">siro</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import questions from '../data/questions2.json'
import GameComponent from '../components/GameComponent.vue';
</script>
