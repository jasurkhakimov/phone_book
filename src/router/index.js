import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'main'},
    component: () => import('../components/phone_book/layout/PhoneBookLayout.vue'),
    children: [
      {
        path: '/birthday',
        name: 'birthday',
        component: () => import(/* webpackChunkName: "about" */ '../components/phone_book/BirthdayPage.vue')
      },
      {
        path: '/deps',
        name: 'deps',
        component: () => import(/* webpackChunkName: "about" */ '../components/phone_book/DepsPage.vue')
      },
    ],
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '../components/phone_book/MainPage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
