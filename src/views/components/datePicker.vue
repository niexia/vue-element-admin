<template>
  <div>
    <nx-date-picker v-model="now"></nx-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      now: new Date()
    }
  }
}
</script>

