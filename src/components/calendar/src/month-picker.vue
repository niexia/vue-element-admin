<template>
  <div class="nx-month-picker">
    <div class="nx-month-picker-pannel">
      <div class="nx-month-picker-pannel__header">
        {{ months[time.month] }}
      </div>
      <div class="nx-month-picker-pannel__content">
        <div class="pannel-content__header">
          <span class="cell is-header" v-for="week in weeks" :key="week">
            {{ week }}
          </span>
        </div>
        <div class="pannel-content__row" v-for="i in 6" :key="i">
          <span class="cell is-day" v-for="j in 7" :key="j"
            :class="{
              'is-reverseable': reversible,
              'is-notCurrentMonth': !isCurrentMonth(i, j),
              'is-today': isToday(i, j),
              'is-notFestival': !isFestival(i, j),
              'is-reverse': isReverse(i, j)
            }"
            @click="pickDay(i, j)">
            {{ formatItem(i, j) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from './utils'
const ONE_DAY_MS = 60 * 60 * 1000 * 24

export default {
  name: 'NxMonthPicker',
  inheritAttrs: false,
  props: {
    value: {
      type: Date,
      default: () => new Date()
    },
    data: {
      type: Object,
      default: () => ({})
    },
    reversible: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default() {
        return {
          label: 'label'
        }
      }
    }
  },
  data() {
    return {
      time: utils.getYearMonthDay(this.value),
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
  },
  computed: {
    days() {
      let {year, month} = utils.getYearMonthDay(new Date(this.time.year, this.time.month, 1))
      let firstDay = utils.getDate(year, month, 1)
      let week = firstDay.getDay()
      let startDay = firstDay - week * ONE_DAY_MS
      let arr = []
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * ONE_DAY_MS))
      }
      return arr
    },
    labelProp() {
      return this.props.label || 'label'
    }
  },
  watch: {
    value(val) {
      this.time = utils.getYearMonthDay(this.value)
    }
  },
  methods: {
    getItem(i, j) {
      let index = (i - 1) * 7 + (j - 1)
      return this.days[index]
    },
    formatItem(i, j) {
      let date = this.getItem(i, j)
      return date.getDate()
    },
    isCurrentMonth(i, j) {
      let date = this.getItem(i, j)
      let {year, month} = utils.getYearMonthDay(utils.getDate(this.time.year, this.time.month, 1))
      let {year: y, month: m} = utils.getYearMonthDay(date)
      return year === y && month === m
    },
    isToday(i, j) {
      let date = this.getItem(i, j)
      let {year, month, day} = utils.getYearMonthDay(new Date())
      let {year: y, month: m, day: d} = utils.getYearMonthDay(date)
      return year === y && month === m && day === d && month === this.time.month
    },
    isFestival(i, j) {
      let date = this.getItem(i, j)
      let day = utils.getFormatDate(date, 'yyyy-MM-dd 00:00:00')
      return this.data[day] && this.data[day][this.labelProp]
    },
    isReverse(i, j) {
      if (!this.reversible) return false
      let date = this.getItem(i, j)
      let day = utils.getFormatDate(date, 'yyyy-MM-dd 00:00:00')
      return this.data[day] && this.data[day].initValue !== this.data[day][this.labelProp]
    },
    pickDay(i, j) {
      if (!this.reversible || !this.isCurrentMonth(i, j)) return false
      let date = this.getItem(i, j)
      let day = utils.getFormatDate(date, 'yyyy-MM-dd 00:00:00')
      this.$emit('pick', day)
    }
  },
}
</script>

<style lang="scss">
.nx-month-picker {
  display: inline-block;
  width: 312px;
  .nx-month-picker-pannel {
    font-size: 14px;
    color: #000;
    .nx-month-picker-pannel__header {
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .nx-month-picker-pannel__content {
      padding: 0 8px 8px 8px;
      .cell {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 42px;
        height: 42px;
        cursor: pointer;
        box-sizing: border-box;
        background-color: #fff;
        &.is-header {
          height: 26px;
          font-size: 12px;
          color: #697391;
          background-color: #EBF2FC;
        }
        &.is-day:hover {
          border: 1px solid #4183d7;
          &.is-notCurrentMonth {
            border: 1px solid #b4d1f2;
          }
          &.is-today {
            border: 2px solid #31bcff;
          }
          &.is-reverse {
            border: 2px solid #629be3;
          }
        }
        &.is-notCurrentMonth {
          color: #bbbbbb !important;
          &.is-reverseable {
            cursor: not-allowed;
          }
        }
        &.is-today {
          border: 2px solid #19b5ff;
        }
        &.is-notFestival {
          background-color: #e8eaf2;
          color: #716d6d;
        }
        &.is-reverse {
          border: 2px solid #4183d7;
          &.is-notCurrentMonth {
            border: 2px solid #a2c1e5;
          }
        }
      }
    }
  }
}
</style>
