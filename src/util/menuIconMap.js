export default {
  iconMap: {
    notice: 'iconfont icon-jingshi',
    navigation: 'iconfont icon-wenjianliebiao',
  },
  getIcon: function(index){
    index = index.replace('/', '');
    return this.iconMap[index] ? this.iconMap[index] : 'iconfont icon-shezhi';
  }
}