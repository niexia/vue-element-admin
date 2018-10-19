/*
 * @Description: vue实例原型链上的方法定义
 * @Author: YangJin
 * @Date: 2018-10-18 11:58:25
 */
export default{
  /**
   * @description: 练习使用... 
   * @param {String} date
   * @return: 
   */
  $formatDate(date){
    if (typeof date != "string") return;
    else {
      console.log(date);
    }
  }
};