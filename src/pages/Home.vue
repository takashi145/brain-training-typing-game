<template>
  <div class="max-w-7xl mx-auto bg-gray-200 min-h-screen flex items-center flex-col">
    <div class="my-6 space-y-3 pb-8 w-full border-b border-gray-400">
      <h1 class="text-center text-2xl font-bold">脳トレタイピング</h1>
      <p class="text-gray-800 text-center">
        表示された文字の<span class="text-lg font-bold text-red-500 underline">色の名前</span>をローマ字で解答してください。
      </p>
    </div>
    
    <div class="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg w-full">
      <div v-if="isStarted">
        正解数:  {{ score }}
        <div class="text-sm mb-2 flex items-center justify-end space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg pr-2">{{ count }}</p>秒
        </div>

        <h2 
          :class="{
            'text-red-500': currentWord.color === 'red',
            'text-blue-500': currentWord.color === 'blue',
            'text-green-500': currentWord.color === 'green',
            'text-yellow-500': currentWord.color === 'yellow',
            'text-black': currentWord.color === 'black',
            'text-white': currentWord.color === 'white',
          }"
          class="text-5xl font-bold mb-4 p-3 text-center bg-gray-300" 
        >
          {{ currentWord.word }}
        </h2>
      </div>

      <div v-if="!isStarted && startCount >= 0" class="text-3xl text-center mb-8">
        {{ startCount }}
      </div>

      <div v-if="isStarted || startCount >= 0" class="mb-4">
        <input v-model="userInput" @keydown.enter="check" class="px-3 py-2 border-gray-500 border rounded-lg w-full focus:outline-none focus:ring-2 focus:border-none" placeholder="入力してください">
        <p class="mx-2 text-sm text-gray-600">入力後Enterキーを押してください。</p>
      </div>
      <div class="text-center">
        <button v-if="!isStarted && startCount < 0" @click="startCountdown" class="px-4 py-2 w-full bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">開始</button>
        <button v-if="isStarted" @click="endGame" class="px-4 py-2 w-full bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">終了</button>
      </div>
    </div>

    <div class="mt-8 mx-auto flex justify-center flex-col items-center max-w-xl">
      <h3 class="text-lg mb-3 underline w-full text-start ">答え方: </h3>
      <div class="flex flex-wrap items-center space-x-2 ">
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

<script setup>
import { ref } from 'vue'
import words from '../data/word.json'

const shuffledWords = ref([]);
const currentWord = ref('')
const userInput = ref('')
const isStarted = ref(false)
const startCount = ref(-1)
const count = ref(3); // 一文の制限時間
const score = ref(0);

let intervalId
let currentIndex = 0

const shuffle = () => {
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = words[i]
    words[i] = words[j]
    words[j] = tmp
  }
  shuffledWords.value = words
  currentWord.value = shuffledWords.value[0];
}

const startCountdown = () => {
  startCount.value = 3;
  shuffle();

  const timerId = setInterval(() => {
    startCount.value--
    if(startCount.value < 0) {
      clearInterval(timerId)
      startGame();
    }
  }, 1000);
}

const startGame = () => {
  reset()
  isStarted.value = true
  intervalId = setInterval(() => {
    count.value--;
    if(count.value < 0) {
      changeWord()
    }
  }, 1000)
}

const endGame = () => {
  isStarted.value = false;
  alert('終了')
}

const reset = () => {
  userInput.value = ''
  currentIndex = 0
  clearInterval(intervalId)
  startCount.value = -1
}

const changeWord = () => {
  count.value = 3
  userInput.value = ''
  currentIndex = (currentIndex + 1) % words.length
  currentWord.value = shuffledWords.value[currentIndex]
}

const check = () => {
  if (userInput.value === currentWord.value.answer) {
    score.value++;
    changeWord();
  }

  userInput.value = ''
}
</script>
