import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useUserStore} from "@/store/index.js";
import {useCookies} from "vue3-cookies";
import {isTokenExpired} from "@/plugins/token.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/nca',
      name: 'nca',
      component: () => import('../views/NCA.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/PostsView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegistrationView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import('../views/404View.vue')
    },
    {
      path: '/news/:id',
      component: () => import('../views/PublicationPageView.vue')
    },
  ],
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

router.beforeEach(async (to,from, next) => {
  const auth = useUserStore()
  const {cookies} = useCookies()

  const accessToken = cookies.get('accessToken');
  if (accessToken) {
    if (isTokenExpired(accessToken)) {
      auth.logout();
      cookies.remove('accessToken', '/', '.nsk-ecoacademy.ru')
    } else {
      auth.updateToken(accessToken)
    }
  }

  if ((to.name === 'account' || to.name === 'admin') && !auth.isUserAuth) {
    next('/login')
  }

  if (to.name === 'admin' && !auth.isAdmin) {
    next('/')
  }

  next()
})

export default router
