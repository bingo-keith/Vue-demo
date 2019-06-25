<template>
  <div class="daily-article">
    <div class="daily-article-title">{{ data.title }}</div>
    <div class="daily-article-content" v-html="data.body"></div>
    <div class="daily-comments" v-html="data.bodu"></div>
    <div class="daily-comments" v-show="comments.length">
      <span>评论 {{ comments.length }}</span>
      <div :key="index" class="daily-comment" v-for="(comment, index) in comments">
        <div class="daily-comment-avatar">
          <img :src="comment.avatar">
        </div>
        <div class="daily-comment-content">
          <div class="daily-comment name">{{ comment.author }}</div>
          <div class="daily-comment-time" v-time="comment.time"></div>
          <div class="daily-comment-text">{{ comment.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Time from '../directives/time'
import $ from '../libs/utils'
export default {
  directives: { Time },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      data: {},
      comments: []
    }
  },
  methods: {
    getArticle() {
      $.ajax.get('news/' + this.id).then(res => {
        res.body = res.body.replace(/src="http/g, 'src="' + $.imgPath + 'http')
        res.body = res.body.replace(
          /src="https/g,
          'src="' + $.imgPath + 'https'
        )
        this.data = res
        this.getComments()
        window.scrollTo(0, 0)
      })
    },
    getComments() {
      this.comments = []
      $.ajax.get('story/' + this.id + '/short-comments').then(res => {
        this.comments = res.comments.map(comment => {
          comment.avatar = $.imgPath + comment.avatar
          return comment
        })
      })
    }
  },
  watch: {
    id(val) {
      if (val) this.getArticle()
    }
  }
}
</script>

<style scoped>
.daily-article {
  margin-left: 450px;
  padding: 20px;
}
.daily-article-title {
  font-size: 28px;
  font-weight: bold;
  color: #222;
  padding: 10px 0;
}
.view-more a {
  display: block;
  cursor: pointer;
  background: #f5f7f9;
  text-align: center;
  color: inherit;
  text-decoration: none;
  padding: 4px 0;
  border-radius: 3px;
}
.daily-comments {
  margin: 10px 0;
}
.daily-comments span {
  display: block;
  margin: 10px 0;
  font-size: 20px;
}
.daily-comment {
  overflow: hidden;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e3e8ee;
}
.daily-comment-avatar {
  width: 50px;
  height: 50px;
  float: left;
}
.daily-comment-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
.daily-comment-content {
  margin-left: 65px;
}
.daily-comment-name {
}
.daily-comment-time {
  color: #9ea7b4;
  font-size: 14px;
  margin-top: 5px;
}
.daily-comment-text {
  margin-top: 10px;
}
</style>