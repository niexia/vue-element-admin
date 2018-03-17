<template>
  <button :disabled="disabled" class="el-button"
    @click="handleClick"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      size ? 'el-button--' + type : '',
    ]"
  >
  <i class="el-icon-loading" v-if="loading" @click="handleInnerClick"></i>
  <i :class="'el-icon-' + icon" v-if="icon && !loading" @click="handleInnerClidk"></i>
  <span v-if="$slots.default" @click="handleInnerClick"><slot></slot></span>
  </button>
</template>
<script>
  export default{
    name: 'El-button',

    props:{
      type:{ //类型 primary,success,warning,danger,info,text
        type: String,
        default: 'default'
      },
      size: String, //尺寸 large,small,mini
      icon: {
        type:String,
        default:'',
      },
      nativeType:{ //原生 type 属性 button,submit,rese
        type: String,
        default: 'button'
      },
      loading: Boolean, //是否加载中状态
      disabled: Boolean, //是否禁用状态
      plain: Boolean,  //是否朴素按钮
      autofocus: Boolean, //	是否默认聚焦
    },

    methods:{
      handleClick(evet){
        this.$emit('click', evt);
      },
      handleInnerClick(evet){
        if(this.disabled){
          evet.stopPropagation();
        }
      }
    }
  }
</script>