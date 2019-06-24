<template>
    <div>
        <h1>首页</h1>
        <p>{{$store.state.count}}</p>
        <p>{{list}}</p>
        <p>{{listLength}}</p>
        <button @click="handleAsyncIncrement">async action</button>
        <button @click="handleActionIncrement">action</button>
        <button @click="handleIncrement(demo)">加一</button>
        <button @click="handleDecrease(2)">减一</button>
        <router-link to="/about">跳转到 about</router-link>
        <hr>
        <Counter :number="number"></Counter>
    </div>
</template>
<script>
    import Counter from './Counter.vue';
    export default {
        data() {
            return {
                demo: {
                    count: 10
                },
                number: 0
            }
        },
        components: {
            Counter
        },
        created() {
            this.$bus.on('add', num => {
                this.number += num;
            })
        },
        computed: {
            count() {
                return this.$store.state.count + 1
            },
            list() {
                return this.$store.getters.filteredList
            },
            listLength() {
                return this.$store.getters.listCount
            }
        },
        methods: {
            handleIncrement(demo) {
                this.$store.commit('increment', demo.count)
            },
            handleDecrease(count) {
                // this.$store.commit('decrease', count)
                this.$store.commit({
                    type: 'decrease',
                    count: count
                })
            },
            handleActionIncrement() {
                this.$store.dispatch('increment', 5)
            },
            handleAsyncIncrement() {
                this.$store.dispatch('increment', 100).then(() => {
                    console.log(this.$store.state.count)
                })
            }
        }
    }
</script>