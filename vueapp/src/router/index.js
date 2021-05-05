
/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import ProdutoList from '@/components/ProdutoList'
import ProdutoCreate from '@/components/ProdutoCreate'
import Callback from '@/components/Callback'
import Home from '@/components/Home'
import AuthService from '../auth/AuthService'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/produto-list',
    name: 'ProdutoList',
    component: ProdutoList,
    meta: { requiresAuth : true }
  },
  {
    path: '/produto-create',
    name: 'ProdutoCreate',
    component: ProdutoCreate,
    meta: { requiresAuth : true }    
  },
  {
    path: '/produto-update/:pk',
    name: 'ProdutoUpdate',
    component: ProdutoCreate
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  }]

const router = new Router({
  mode: 'history',
  routes
})

//const auth = new AuthService()

router.beforeEach((to, from, next) => {
  console.log('routing ', from, AuthService.authenticated())
  if(to.meta.requiresAuth)
  {
    if(!AuthService.authenticated())
    {
      next('/');
    }
  }
  next()
})

export function authGuard(to, from, next) {

  if(!AuthService.authenticated()){
    next('/');
  }
  next()

}

export default router
