import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const Index = () => import(/* webpackChunkName: "Index" */ '../views/index/index.vue')
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
  ]
})

export default router
