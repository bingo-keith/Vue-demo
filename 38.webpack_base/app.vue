<template>
    <div>Hello {{ name }} </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'Vue.js'
        }
    }
}
</script>
<style lang="css" scoped>
    div {
        color: #f60;
        font-size: 24px;
    }
</style>