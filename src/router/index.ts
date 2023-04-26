import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../pages/Welcome.vue';
import Game1 from '../pages/Game1.vue';
import Game2 from '../pages/Game2.vue';

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/game1',
    name: 'game1',
    component: Game1
  },
  {
    path: '/game2',
    name: 'game2',
    component: Game2
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
