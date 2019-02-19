<template>
  <div>
    <component :data="config" :is="'MultipleSelect'"></component>
  </div>
</template>
<script>
import MultipleSelect from './../components/select/multipleSelect';
export default{
  components: {
    MultipleSelect
  },
  data(){
    return{
      config: {
        key: 'name',
        list: [
          {
            name: 'A',
            value: 1
          },
          {
            name: 'B',
            value: 2
          },
          {
            name: 'C',
            value: 3
          }
        ]
      }
    }
  },
}  
</script>
<style>

</style>
