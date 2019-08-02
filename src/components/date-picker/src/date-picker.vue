<template>
  <div class="nx-date-picker" v-click-outside>
    <input type="text" :value="formatDate">
    <div class="pannel" v-show="isVisible">
      <div class="pannel-nav">
        <span @click="preYear">&lt;&lt;</span>
        <span @click="preMonth">&lt;</span>
        <span>{{ time.year }}年</span>
        <span>{{ time.month + 1 }}月</span>
        <span @click="nextMonth">&gt;</span>
        <span @click="nextYear">&gt;&gt;</span>
      </div>
      <div class="pannel-content">
        <div>
          <span class="cell" v-for="item in weekDays" :key="item">
            {{ item }}
          </span>
        </div>
        <div v-for="i in 6" :key="i">
          <span
            v-for="j in 7" 
            :key="j"
            class="cell is-day"
            :class="{
              notCurrentMonth: !isCurrentMonth(visibleDays[(i - 1) * 7 + (j - 1)]),
              today: isToday(visibleDays[(i - 1) * 7 + (j - 1)]),
              select: isSelect(visibleDays[(i - 1) * 7 + (j - 1)])
            }"
            @click="chooseDate(visibleDays[(i - 1) * 7 + (j - 1)])">
            {{ visibleDays[(i - 1) * 7 + (j - 1)].getDate() }}
          </span>
        </div>
      </div>
      <div class="pannel-footer">
        今天
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from './utils'
export default {
  name: 'NxDatePicker',
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  directives: {
    clickOutside: {
      bind(el, bindings, vnode) {
        const handler = (event) => {
          if (el.contains(event.target)) {
            if (!vnode.context.isVisible) {
              vnode.context.focus()
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.blur()
            }
          }
        }
        el.handler = handler;
        document.addEventListener('click', handler)
      },
      unbind() {
        document.removeEventListener('click', el.handler)
      }
    }
  },
  data() {
    let {year, month} = utils.getYearMonthDay(this.value)
    return {
      isVisible: false,
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
      time: {year, month}
    }
  },
  computed: {
    visibleDays() {
      let {year, month} = utils.getYearMonthDay(utils.getDate(this.time.year, this.time.month, 1))
      // 当前月的第一天
      let currentFirstDay = utils.getDate(year, month, 1)
      // 当前月第一天是周几
      let week = currentFirstDay.getDay()
      // 当前月日历开始的第一天
      let oneDayTime = 60 * 60 * 1000 * 24
      let startDay = currentFirstDay - week * oneDayTime
      let days = [];
      for (let i = 0; i < 42; i++) {
        days.push(new Date(startDay + i * oneDayTime));
      }
      return days;
    },
    formatDate() {
      let {year, month, day} = utils.getYearMonthDay(this.value);
      return `${year}-${month}-${day}`;
    }
  },
  methods: {
    focus() {
      this.isVisible = true;
    },
    blur() {
      this.isVisible = false;
    },
    isCurrentMonth(date) {
      let {year, month} = utils.getYearMonthDay(utils.getDate(this.time.year, this.time.month, 1))
      let {year: y, month: m} = utils.getYearMonthDay(date)
      return year === y && month === m
    },
    isToday(date) {
      let {year, month, day} = utils.getYearMonthDay(new Date())
      let {year: y, month: m, day: d} = utils.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    chooseDate(date) {
      this.time = utils.getYearMonthDay(date)
      this.$emit('input', date)
      this.blur()
    },
    isSelect(date) {
      let {year, month, day} = utils.getYearMonthDay(this.value)
      let {year: y, month: m, day: d} = utils.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    preMonth() {
      // 获取当前月的一个日期
      let d = utils.getDate(this.time.year, this.time.month, 1)
      d.setMonth(d.getMonth() - 1)
      this.time = utils.getYearMonthDay(d)
    },
    nextMonth() {
      let d = utils.getDate(this.time.year, this.time.month, 1)
      d.setMonth(d.getMonth() + 1)
      this.time = utils.getYearMonthDay(d)
    },
    preYear() {
      let d = utils.getDate(this.time.year, this.time.month, 1)
      d.setFullYear(d.getFullYear() - 1)
      this.time = utils.getYearMonthDay(d)
    },
    nextYear() {
      let d = utils.getDate(this.time.year, this.time.month, 1)
      d.setFullYear(d.getFullYear() + 1)
      this.time = utils.getYearMonthDay(d)
    }
  },
}
</script>

<style lang="scss" scoped>
.nx-date-picker {
  position: relative;
  .pannel {
    width: 224px;
    position: absolute;
    top: 31px;
    font-size: 12px;
    background: #fff;
    box-shadow: 2px 2px 2px pink, -2px -2px 2px pink;
    .pannel-nav {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 30px;
      span {
        cursor: pointer;
        user-select: none;
      }
    }
    .pannel-content {
      .cell {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        color: #000;
        cursor: default;
        &.notCurrentMonth {
          color: gray
        }
        &.today {
          color: #fff;
          background: red;
          border-radius: 4px;
        }
        &.is-day:hover,
        &.select {
          box-sizing: border-box;
          border: 1px solid pink;
          border-radius: 4px;
        }
      }
    }
    .pannel-footer {
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  } 
}
</style>
