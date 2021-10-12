import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'birthday'},
    component: () => import('../components/phone_book/layout/PhoneBookLayout.vue'),
    children: [
      {
        path: '/birthday',
        name: 'birthday',
        component: () => import(/* webpackChunkName: "about" */ '../components/phone_book/BirthdayPage.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
