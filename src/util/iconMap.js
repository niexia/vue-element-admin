export default {
  iconMap: {
    notice: 'iconfont icon-all',
    navigation: 'iconfont icon-favorite',
  },
  getIcon: function(index){
    index = index.replace('/', '');
    return this.iconMap[index] ? this.iconMap[index] : 'iconfont icon-set';
  }
}