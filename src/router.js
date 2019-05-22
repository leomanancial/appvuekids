import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
        icon: 'home', title: 'Home'
      },
      component: () => import(/* webpackChunkName: "home" */ './pages/home/Home')
    },
    {
      path: '/lista-entrada',
      name: 'lista-entrada',
      meta: {
        icon: 'list-ul', title: 'Lista de entrada'
      },
      component: () => import(/* webpackChunkName: "lista-entrada" */ './pages/lista-entrada/Lista-Entrada')

    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: () => import(/* webpackChunkName: "logins" */ './pages/login/Login')
    }
  ]
})
router.beforeEach((to, from, next) => {
  //Nome da Aba da página
  document.title = `${to.meta.title} - Kids App`

  if (!window.uid && to.name != 'login') {
    next({ name: 'login' })
  } else {
  next()
  }
})

export default router
