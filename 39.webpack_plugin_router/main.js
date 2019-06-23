import './style.css'
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';

Vue.use(VueRouter)

const Routes = [
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./views/about.vue'], resolve)
    },
    {
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
]

const RouterConfig = {
    // 使用h5的history路由模式
    mode: 'history',
    routes: Routes
}

const router = new VueRouter(RouterConfig)

router.beforeEach((to, from ,next) => {
    window.document.title = to.meta.title
    next()
})

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
