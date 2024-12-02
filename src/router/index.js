import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Wangwangwang from '@/views/Wangwangwang.vue'
import Gbe from '@/views/Gbe.vue'
import Login from '@/views/Login.vue'
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: { requiresAuth: true },
    redirect: '/wangwangwang',
    children: [
      {
        path: 'wangwangwang',
        name: 'Wangwangwang',
        component: Wangwangwang,
        meta: { requiresAuth: true }
      },
      {
        path: 'gbe',
        name: 'Gbe',
        component: Gbe,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['isAuthenticated']) {
        next('/');
      } else {
        next();
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// auth required
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['isAuthenticated']) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
