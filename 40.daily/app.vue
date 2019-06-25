<template>
  <div class="daily">
    <div class="daily-menu">
      <div :class="{on: type === 'recommend'}" 
            class="daily-menu-item"
            @click="handleToRecommend"
      >每日推荐</div>
      <div
        :class="{on: type === 'daily'}"
        @click="showThemes = !showThemes"
        class="daily-menu-item"
      >主题日报</div>
      <ul v-show="showThemes">
        <li :key="index" v-for="(item, index) in themes">
          <a :class="{ on: item.id === themeId && type === 'daily'}"
              @click="handleToTheme(item.id)"
          >{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="daily-list" ref="list" @scroll="handleScroll">
      <template v-if="type === 'recommend'">
        <div v-for="(list, index) in recommendList" :key="index">
          <div class="daily-date">{{ formatDay(list.date) }}</div>
          <Item
            v-for="item in list.stories"
            :data="item"
            :key="item.id"
          ></Item>
        </div>
      </template>
      <template v-if="type === 'daily'">
        <Item
          v-for="item in list"
          :data="item"
          :key="item.id"
        ></Item>
      </template>
    </div>
    <div class="daily">
      <Item @click.native="handleClick(item.id)"></Item>
      <daily-article :id="articleId"></daily-article>
    </div>
  </div>
</template>

<script>
import $ from './libs/utils'
import Item from './components/Item.vue'
import DailyArticle from './components/DailyArticle.vue';
export default {
  data() {
    return {
      themes: [],
      showThemes: false,
      type: 'recommend',
      themeId: 0,
      recommendList: [],
      dailyTime: $.getTodayTime(),
      isLoading: false,
      list: [],
      isLoading: false,
      articleId: 0
    }
  },
  components: {
    Item,
    DailyArticle,
  },
  mounted() {
    this.getThemes()
    this.getRecommendList()
    const $list = this.$refs.list
    $list.addEventListener('scroll', () => {
      if(this.type === 'daily' || this.isLoading) return
      if($list.scrollTop + document.body.clientHeight >= $list.scrollHeight
      ){
         this.dailyTime -= 86400000
         this.getRecommendList()
       }
    })
  },
  methods: {
    handleClick(id) {
      this.articleId = id
    },
    handleScroll() {
      const $list = this.$refs.list
      if(this.type === 'daily' || this.isLoading) return
      if($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
        this.dailyTime -= 86400000
        this.getRecommendList()
      }
    },
    getThemes() {
      $.ajax.get('themes').then(res => {
        this.themes = res.others
      })
    },
    handleToTheme(id) {
      this.type = 'daily'
      this.themeId = id
      this.list = []
      $.ajax.get('theme/' + id).then(res => {
        this.list = res.stories.filter(item => item.type !== 1)
      })
    },
    handleToRecommend() {
      this.type = 'recommend'
      this.recommendList = []
      this.dailyTime = $.getTodayTime()
      this.getRecommendList()
    },
    getRecommendList() {
      this.isLoading = true
      const prevDay = $.prevDay(this.dailyTime + 86400000)
      $.ajax.get('news/before/' + prevDay).then(res => {
        this.recommendList.push(res)
        this.isLoading = false
      })
    },
    formatDay(date) {
      let month = date.substr(4, 2)
      let day = date.substr(6, 2)
      if(month.substr(0, 1) === '0') month = month.substr(1, 1)
      if(day.substr(0, 1) === '0') day = day.substr(1, 1)
      return `${month}月${day}日`
    }
  }
}
</script>
<style scoped>
.daily-menu ul {
  list-style: none;
}
.daily-menu ul li a {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 5px 0;
  margin: 5px 0;
  cursor: pointer;
}
.daily-menu ul li a:hover,
.daily-menu ul li a.on {
  color: #3399ff;
}
.daily-list {
  width: 30px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 150px;
  overflow: auto;
  border-right: 1px solid #d7dde4;
}
.daily-date {
  text-align: center;
  margin: 10px 0;
}
</style>