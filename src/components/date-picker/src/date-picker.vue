<template>
  <div class="nx-date-picker" v-click-outside>
    <input class="nx-input" type="text" :value="formatDate">
    <div class="pannel" v-show="isVisible">
      <div class="pannel-arrow" style="left: 35px;"></div>
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
            @click.stop="chooseDate(visibleDays[(i - 1) * 7 + (j - 1)])">
            {{ visibleDays[(i - 1) * 7 + (j - 1)].getDate() }}
          </span>
        </div>
      </div>
      <div class="pannel-footer" @click.stop="chooseToday">今天</div>
    </div>
  </div>
</template>

<script>
import * as utils from './utils'
const ONE_DAY_MS = 60 * 60 * 1000 * 24;

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
      unbind(el) {
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
      let startDay = currentFirstDay - week * ONE_DAY_MS
      let days = [];
      for (let i = 0; i < 42; i++) {
        days.push(new Date(startDay + i * ONE_DAY_MS));
      }
      return days;
    },
    formatDate() {
      let {year, month, day} = utils.getYearMonthDay(this.value);
      return `${year}-${month + 1}-${day}`;
    }
  },
  watch: {
    value(val) {
      this.time = utils.getYearMonthDay(val)
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
    chooseToday() {
      let today = new Date()
      this.time = utils.getYearMonthDay(today)
      this.$emit('input', today)
      this.blur()
    },
    isSelect(date) {
      let {year, month, day} = utils.getYearMonthDay(this.value)
      let {year: y, month: m, day: d} = utils.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    preMonth() {
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
    top: 42px;
    font-size: 12px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 pink;
    .pannel-arrow {
      position: absolute;
      top: -6px;
      left: 50%;
      margin-right: 3px;
      border-top-width: 0;
      border-bottom-color: #ebeef5;
      &::after {
        position: absolute;
        display: block;
        content: " ";
        width: 0;
        height: 0;
        border-width: 6px;
        border-color: transparent;
        border-style: solid;
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #fff;
      }
    }
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
        &.is-day {
          cursor: pointer;
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
      cursor: pointer;
    }
  }
  .nx-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 260px;
  }
}
</style>
