<template>
  <div>
    <p>calendar 日历组件</p>
    <el-divider></el-divider>
    <nx-calendar
      :year="year"
      :data="festivalData"
      :props="calendarProps"
      :reversible="true"
      @reverse-change="handleChange">
    </nx-calendar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      year: new Date(),
      festivalData: {
        '2019-10-01 00:00:00': {isFestival: true},
        '2019-10-02 00:00:00': {isFestival: true},
        '2019-10-03 00:00:00': {isFestival: true},
        '2019-10-04 00:00:00': {isFestival: true},
        '2019-10-05 00:00:00': {isFestival: true},
        '2019-10-06 00:00:00': {isFestival: true},
        '2019-10-07 00:00:00': {isFestival: true}
      },
      calendarProps: {
        label: 'isFestival'
      }
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  },
}
</script>

