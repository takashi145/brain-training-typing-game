<template>
  <div class="bg-gray-200 min-h-screen flex items-center flex-col">
    <h1 class="text-3xl my-8 font-bold">脳トレタイピング</h1>
    <div class="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg w-full">
      <div v-if="isStarted">
        正解数:  {{ score }}
        <div class="text-sm mb-2 flex items-center justify-end space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg pr-2">{{ count }}</p>秒
        </div>

        <h2 class="text-5xl font-bold mb-4 p-3 text-center bg-gray-300" :class="` text-${currentWord.color} text-${currentWord.color}-400`">{{ currentWord.word }}</h2>
        <input v-model="userInput" @keydown.enter="check" class="px-3 py-2 border-gray-300 border rounded-lg mb-4 w-full"> 
      </div>
      <div v-if="!isStarted && startCount >= 0" class="text-3xl text-center mb-8">
        {{ startCount }}
      </div>
      <div class="text-center">
        <button v-if="!isStarted && startCount < 0" @click="startCountdown" class="px-4 py-2 w-full bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">開始</button>
        <button v-if="isStarted" @click="endGame" class="px-4 py-2 w-full bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">終了</button>
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
