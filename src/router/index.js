import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'deps'},
    component: () => import('../components/phone_book/layout/PhoneBookLayout.vue'),
    children: [
      {
        path: '/deps',
        name: 'deps',
        component: () => import(/* webpackChunkName: "about" */ '../components/phone_book/DepsPage.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "about" */ '../components/phone_book/AdminPage.vue')
      },
      {
        path: '/emp/:id',
        name: 'emp',
        component: () => import(/* webpackChunkName: "about" */ '../components/phone_book/EmpPage.vue')
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
