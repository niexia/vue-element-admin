<template>
  <div class="vccc-loading" :style="{top: top, left: left, width:width,height:height}">
      <div class="bg"></div>
      <div class="vccc-container">
          <i class="icon-spinner icon-spin icon-4x"></i>
      </div>
  </div>
</template>
<script>
  export default {
      name: 'vccc-loading',
      data(){
          return{
              top:0,
              left:0,
              width: '100%',
              height: '100%',
          }
      }
  }
</script>
<style>
  @import "../../assets/css/font-awesome.css";
    .vccc-loading{
        position: fixed;
        color:#45B0FF;
        top:0;
        left:0;
        width:100%;
        height: 100%;
    }
    .vccc-loading .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.7;
        background: #ffffff;
        z-index: 999;
    }
    .vccc-loading .vccc-container{
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
        z-index: 9999999999;
    }
</style>
