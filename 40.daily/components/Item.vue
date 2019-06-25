<template>
    <a class="daily-item">
        <div class="daily-img" v-if="data && data.images">
            <img :src="imgPath + data && data.images[0]">
        </div>
        <div class="daily-title"
            :class="{noImg: data && !data.images}"
        >{{ data && data.title }}</div>
    </a>
</template>

<script>
import $ from '../libs/utils';
export default {
    props: {
        data: {
            type: Object
        }
    },
    data() {
        return {
            imgPath: $.imgPath
        }
    },
    created() {
        console.log(this.data, 'test');
        
    }
};
</script>

<style scoped>
.daily-item {
    display: block;
    color: inherit;
    text-decoration: none;
    padding: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all .3s ease-in-out;
}
.daily-item:hover {
    background: #e3e8ee;
}
.daily-img {
    width: 80px;
    height: 8px;
    float: left;
}
.daily-img img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
}
.daily-item {
    padding: 10px 5px 10px 90px;
}
.daily-title.noImg {
    padding-left: 5px;
}
</style>