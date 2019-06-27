
const Time = {
  // 获取当前时间戳
  getUnix () {
    return Date.now()
  },
  // 获取今天0点0分0秒的时间戳
  getTodayUnix () {
    let date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取今年1月1日0点0分0秒的时间戳
  getYearUnix () {
    let date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    date.setMonth(0)
    date.setDate(1)
    return date.getTime()
  },
  getLastDate (time) {
    const date = new Date(time)
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
  },
  getFormatTime (timestamp) {
    const now = this.getUnix()
    const today = this.getTodayUnix()
    const year = this.getYearUnix()
    const timer = (now - timestamp) / 1000
    console.log(timer)
    let tip = '';
    if (timer <= 0) {
      tip = '刚刚'
    } else if (Math.floor(timer / 60) <= 0) {
      tip = '刚刚'
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前'
    } else if (timer > 3600 && (timestamp - today >= 0)) {
      tip = Math.floor(timer / 3600) + '小时前'
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前'
    } else {
      tip = this.getLastDate(timestamp)
    }
    return tip
  },
}

export default {
  bind (el, binding) {
    el.innerHTML = Time.getFormatTime(binding.value + 1000)
    el.__timeout_ = setInterval(() => {
      el.innerHTML = Time.getFormatTime(bingding.value * 1000)
    }, 60000)
  },
  unbind (el) {
    clearInterval(el.__timeout_)
    delete el.__timeout_
  }
}
