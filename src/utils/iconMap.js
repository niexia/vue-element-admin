export default {
  iconMap: {
    home: 'icon-home',
    table: 'icon-layout',
    form: 'icon-file-text',
    extend: 'icon-cube',
    setting: 'icon-settings',
    exception: 'icon-close-square',
  },
  /**
   * 根据路由地址获取菜单的icon
   * 
   * @param {String} path 一级菜单的地址
   * @return {String} iconClass 图标对应的class
   */
  getIcon: function(path){
    path = path.replace('/', '');
    return this.iconMap[path] ? this.iconMap[path] : 'icon-star';
  }
}