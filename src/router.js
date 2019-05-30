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
      path: '/nova-lista',
      name: 'nova-lista',
      meta: {
        icon: 'fas fa-plus', title: 'Nova lista'
      },
      component: () => import(/* webpackChunkName: "lista-entrada" */ './pages/lista-entrada/Nova-lista')

    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: () => import(/* webpackChunkName: "logins" */ './pages/login/Login')
    },
    {
      path: '/novo-aluno',
      name: 'novo-aluno',
      meta: {
        icon: 'fa fa-user-plus', title: 'Novo aluno'
      },
      component: () => import(/* webpackChunkName: "novo-aluno" */ './pages/novo-aluno/Novo-aluno')
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
