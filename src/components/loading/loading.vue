<template>
  <div class="KY-loading" style="{top: top, left: left, width:width,height:height">
      <div class="bg"></div>
      <div class="KY-continer">
          <i class="icon-spinner icon-spin icon-4x"></i>
      </div>
  </div>
</template>
<script>
    export default {
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
    .KY-loading{
        position: fixed;
        color:#45B0FF;
        top:0;
        left:0;
        width:100%;
        height: 100%;
    }
    .KY-loading .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.7;
        background: #ffffff;
        z-index: 999;
    }
    .KY-loading .KY-container{
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999999999;
    }
</style>
