import './style.css'
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
    state: {
        count: 0,
        list: [1, 5, 8, 10, 30, 50]
    },
    mutations: {
        increment(state, count = 1) {
            state.count += count 
        },
        decrease(state, params) {
            state.count -= params.count
        }
    },
    getters: {
        filteredList: state => {
            return state.list.filter(item => item < 10)
        },
        listCount: (state, getters) => {
            return getters.filteredList.length
        }
    },
    actions: {
        increment(context, count) {
            context.commit('increment', count)
        },
        ayncIncrement(context, count) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increment', 100)
                    resolve()
                }, 1000)
            })
        }
    }
})

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
    store,
    render: h => h(App)
})
