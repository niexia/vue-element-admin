<template>
  <div class="nx-calendar">
    <nx-month-picker
     v-for="(month, index) in targetMonths"
     :key="index"
     :value="month"
     :data="targetData"
     v-bind="$props"
     @pick="pickDay">
    </nx-month-picker>
  </div>
</template>

<script>
import NxMonthPicker from './month-picker'
import * as utils from './utils'
import { CreateStore } from './utils'

export default {
  name: 'NxCalendar',
  components: {
    NxMonthPicker
  },
  props: {
    year: {
      required: true,
      type: [String, Date],
      default: () => new Date()
    },
    months: {
      type: Array,
      default() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      }
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
      reversion: new CreateStore(),
      targetData: {},
    }
  },
  computed: {
    targetMonths() {
      let date = this.toDate(this.year)
      let year = date.getFullYear()
      let arr = this.months.map(month => {
        return utils.getDate(year, month - 1, 1)
      })
      return arr
    },
    labelProp() {
      return this.props.label || 'label'
    }
  },
  watch: {
    data: {
      handler() {
        this.reset()
      },
      immediate: true,
    }
  },
  methods: {
    pickDay(day) {
      console.log('day: ', day);
      // update data
      if (this.targetData[day]) {
        this.targetData[day][this.labelProp] = !this.targetData[day][this.labelProp]
      } else {
        this.$set(this.targetData, day, {
          initValue: false,
          [this.labelProp]: true
        })
      }
      // update reversion
      let data = this.targetData[day]
      if (this.reversion.hasItem(day) && data.initValue === data[this.labelProp]) {
        this.reversion.removeItem(day)
      } else {
        this.reversion.setItem(day, {[this.labelProp]: data[this.labelProp]})
      }
      this.$emit('reverse-change', this.formatReversion(this.reversion.store))
    },
    formatReversion(map) {
      let obj = Object.create(null)
      for (let [key, val] of map) {
        obj[key] = val
      }
      return obj
    },
    initData() {
      let res = {}
      Object.keys(this.data).forEach(key => {
        let temp = Object.assign({}, this.data[key], {initValue: this.data[key][this.labelProp]})
        res[key] = temp
      })
      this.targetData = res
    },
    toDate(val) {
      if (!val) {
        throw new Error('invalid Date')
      }
      return val instanceof Date ? val : new Date(val)
    },
    reset() {
      this.reversion.clear()
      this.initData()
    }
  },
}
</script>

<style lang="scss">
.nx-calendar {
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
}
@media (min-width: 973px) {
  .nx-calendar {
    width: 936px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
