import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/home',
      name: 'home',
      meta: {
        icon: 'home',
        title: 'Home'
      },
      component: () => import( /* webpackChunkName: "home" */ './pages/home/Home')
    },
    {
      path: '/lista-presenca',
      name: 'lista-presenca',
      meta: {
        icon: 'fas fa-plus',
        title: 'Lista de Presenca'
      },
      component: () => import( /* webpackChunkName: "lista-entrada" */ './pages/lista-entrada/Lista-Presenca')

    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: () => import( /* webpackChunkName: "logins" */ './pages/login/Login')
    },
    {
      path: '/alunos-matriculados',
      name: 'alunos-matriculados',
      meta: {
        icon: 'fas fa-list',
        title: 'Alunos Matriculados'
      },
      component: () => import( /* webpackChunkName: "logins" */ './pages/lista-entrada/Alunos-Matriculados')
    },

  ]
})
router.beforeEach((to, from, next) => {
  //Nome da Aba da página
  document.title = `${to.meta.title} - Kids App`

  if (!window.uid && to.name != 'login') {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})

export default router
