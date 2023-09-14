import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView";
import CommentView from "@/views/CommentView";

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/comment',
    component: CommentView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
