<template>
  <div class="nx-code">
    <h3>
      <p class="is-404">404</p>
      <p>功能正在开发中...</p>
    </h3>
  </div>
</template>
<script>
export default {
  name: 'NxCode',
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.nx-code {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  font-size: 18px;
  color: #acacac;
  .is-404 {
    font-size: 38px;
    margin-bottom: 15px;
  }
}
</style>