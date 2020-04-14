import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const Index = () => import(/* webpackChunkName: "Index" */ '../views/index/index.vue')
const Article = () => import(/* webpackChunkName: "Index" */ '../views/article/index.vue')
var router = new VueRouter({
  // 命名:组件名大驼峰、path/name小驼峰
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/article',
    name: 'article',
    component: Article
  },
  ]
})

export default router
