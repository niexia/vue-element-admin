export default {
  iconMap: {
    notice: 'iconfont icon-unlock',
    navigation: 'iconfont icon-settings',
  },
  getIcon: function(index){
    index = index.replace('/', '');
    return this.iconMap[index] ? this.iconMap[index] : 'iconfont icon-at';
  }
}