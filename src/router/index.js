import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Layout/index'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Layout/home.vue')
      },
      {
        path: 'category',
        component: () => import('@/views/Layout/category.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/Layout/cart.vue')
      },
      {
        path: 'user',
        component: () => import('@/views/Layout/user.vue')
      }

    ]
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay')
  },
  {
    path: '/myorder',
    component: () => import('@/views/MyOrder')
  },
  {
    path: '/prodetail/:id',
    component: () => import('@/views/ProDetail')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/searchlist',
    component: () => import('@/views/Search/list.vue')
  }
]

const router = new VueRouter({
  routes
})
const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
