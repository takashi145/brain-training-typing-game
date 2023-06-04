<template>
  <div class="max-w-7xl mx-auto min-h-screen flex items-center flex-col">
    <div class="my-3 pb-8 w-full border-b border-gray-400">
      <router-link to="/" class="m-3 text-gray-600 underline hover:text-gray-800">←戻る</router-link>
      <h1 class="text-center text-2xl font-bold mb-2">色名を答える脳トレ</h1>
      <p class="text-gray-800 text-center">
        文字の<span class="text-lg font-bold text-red-500 underline">色の名前</span>を解答してください。
      </p>
    </div>
    
    <GameComponent :questions="questions" />

    <div class="mt-8 mx-auto flex justify-center flex-col items-center max-w-xl px-3">
      <h3 class="text-lg mb-3 underline w-full text-start ">答え方: </h3>
      <div class="flex flex-wrap space-x-2">
        <div class="flex items-center space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="bg-red-500 w-5 h-5 mr-3"></div> : 
          <p class="">aka</p>
        </div>
        <div class="flex items-center space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="bg-blue-500 w-5 h-5 mr-3"></div> : 
          <p class="">ao</p>
        </div>
        <div class="flex items-center space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="bg-green-500 w-5 h-5 mr-3"></div> : 
          <p class="">midori</p>
        </div>
        <div class="flex items-center space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="bg-yellow-500 w-5 h-5 mr-3"></div> : 
          <p class="">ki</p>
        </div>
        <div class="flex items-center space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="bg-black w-5 h-5 mr-3"></div> : 
          <p class="">kuro</p>
        </div>
        <div class="flex items-center space-x-3 p-1 shadow-lg border border-gray-400 rounded">
          <div class="bg-white border-black border w-5 h-5 mr-3"></div> : 
          <p class="">siro</p>
        </div>  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import questions from '../data/questions.json'
import GameComponent from '../components/GameComponent.vue';
</script>
