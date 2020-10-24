<template>
  <div class="page-extend-calendar">
    <nx-calendar
      :year="year"
      :data="festivalData"
      :props="calendarProps"
      :reversible="true"
      @reverse-change="handleChange">
    </nx-calendar>
    <div class="calendar-content">
      {{calendarChanged}}
    </div>
  </div>
</template>

<script>
import {
  getYearMonthDay,
  getFormatDate
} from '@/components/calendar/src/utils.js';

const date = new Date();
const ONE_DAY_MS = 60 * 60 * 1000 * 24;

export default {
  data() {
    return {
      year: date,
      festivalData: {},
      calendarChanged: {},
    }
  },
  computed: {
    calendarProps() {
      return {
        label: 'isFestival'
      }
    }
  },
  mounted() {
    this.setDefaultFestival();
  },
  methods: {
    setDefaultFestival() {
      const { year } = getYearMonthDay(date);
      const startTime = new Date(year, 9, 1).getTime();
      for (let i = 0; i < 7; i++) {
        const day = new Date(startTime + i * ONE_DAY_MS);
        const formatDay = getFormatDate(day, 'yyyy-MM-dd 00:00:00');
        this.$set(this.festivalData, formatDay, {isFestival: true});
      }
    },
    handleChange(val) {
      this.calendarChanged = val;
    }
  },
}
</script>
<style lang="scss">
.page-extend-calendar {
  .calendar-content {
    margin: 10px 18%;
  }
}
</style>

