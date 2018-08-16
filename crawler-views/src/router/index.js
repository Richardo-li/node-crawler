import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/news',
      name: 'news',
      component: () => import("../pages/news.vue")   //路由懒加载
    },
    {
      path: '/heroList',
      name: 'heroList',
      component: () => import("../pages/heroList.vue")
    },
  ]
})
