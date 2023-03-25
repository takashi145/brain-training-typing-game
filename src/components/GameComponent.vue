<template>
  <div class="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg w-full">
    <div v-if="isStarted">
      <div class="text-sm mb-2 flex items-center justify-end space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg pr-2">{{ count }}</p>秒
      </div>

      <h2 
        :class="{
          'text-red-500': currentQuestion.color === 'red',
          'text-blue-500': currentQuestion.color === 'blue',
          'text-green-500': currentQuestion.color === 'green',
          'text-yellow-500': currentQuestion.color === 'yellow',
          'text-black': currentQuestion.color === 'black',
          'text-white': currentQuestion.color === 'white',
        }"
        class="text-5xl font-bold mb-4 p-3 text-center bg-gray-300" 
      >
        {{ currentQuestion.word }}
      </h2>
    </div>

    <div v-if="!isStarted && startCount >= 0" class="text-3xl text-center mb-8">
      {{ startCount }}
    </div>

    <div v-if="isStarted || startCount >= 0" class="mb-4">
      <div v-if="isCorrect !== null" class="fixed">
        <p v-if="isCorrect" class="text-green-500 text-3xl">〇</p>
        <p v-else class="text-red-500 text-3xl">×</p>
      </div>
      
      <input 
        v-model="userInput" 
        @keydown.enter="checkAnswer" 
        class="px-8 py-2 border-gray-500 border rounded-lg w-full focus:outline-none"
        placeholder="入力してください"
      />
      <p class="mx-2 text-sm text-gray-600">入力後Enterキーを押してください。</p>
    </div>
    <div class="text-center">
      <button v-if="!isStarted && startCount < 0" @click="startGame" class="px-4 py-2 w-full bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">脳トレを開始</button>
      <button v-if="isStarted" @click="endGame" class="px-4 py-2 w-full bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">終了</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  questions: Array
})

const shuffledQuestions = ref(props.questions);
const currentQuestion = ref('')
const userInput = ref('')
const isStarted = ref(false)
const startCount = ref(-1)
const count = ref(3); // 一文の制限時間
const isCorrect = ref(null); // 問題に正解したかどうか
let intervalId
let currentIndex = 0

onMounted(() => {
  // Spaceキーで現在の入力をリセット
  document.addEventListener('keydown', e => {
    if(e.code === 'Space') {
      userInput.value = ''
    }
  })
})

// 問題をシャッフルする
const shuffle = () => {
  for (let i = props.questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = shuffledQuestions.value[i]
    shuffledQuestions.value[i] = shuffledQuestions.value[j]
    shuffledQuestions.value[j] = tmp
  }

  currentQuestion.value = shuffledQuestions.value[0];
}

const startGame = () => {
  if(!confirm('ゲームを開始しますか？')) return;

  startCount.value = 3;
  const timerId = setInterval(() => { // 開始前の3秒のカウントダウン
    startCount.value--
    if(startCount.value < 0) {
      clearInterval(timerId)
      shuffle()
      isStarted.value = true
      intervalId = setInterval(() => { // 3秒ごとに別の問題を出す
        count.value--;
        if(count.value < 0) {
          changeQuestion()
        }
      }, 1000)
    }
  }, 1000);
}

const endGame = () => {
  isStarted.value = false;
  userInput.value = ''
  currentIndex = 0
  clearInterval(intervalId)
  startCount.value = -1
  alert('終了')
}

const changeQuestion = () => {
  count.value = 3
  userInput.value = ''
  currentIndex = (currentIndex + 1) % props.questions.length
  currentQuestion.value = shuffledQuestions.value[currentIndex]
}

const checkAnswer = () => {
  if(!isStarted.value) return;

  if (userInput.value === currentQuestion.value.answer) {
    isCorrect.value = true;
    changeQuestion();
  }else {
    isCorrect.value = false;
  }
  setTimeout(() => {
    isCorrect.value = null;
  }, 500)
  userInput.value = ''
}
</script>
