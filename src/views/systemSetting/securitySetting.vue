<template>
  <div class="main__securitySetting">
    <div class="securitySettingBox">
      <nav class="securitySetting__nav">
        <ul class="navBox">
          <li :class="['nav__item', item.key === navActive && 'is-active']" 
            v-for="item in navList"
            :key="item.key"
            @click="navActive = item.key">
            {{item.name}}
          </li>
        </ul>
      </nav>
      <main class="securitySetting__content">
        <section class="content__item" v-if="navActive === 1">
          <p class="item__title">安全设置</p>
          <ul>
            <li class="item__detail">
              <section>
                <span class="detail__title"><i class="icon-person mr-5"></i>帐号密码</span><br>
                <span class="detail__text">更新当前帐号密码</span>
              </section>
              <section>
                <el-button>修改</el-button>
              </section>
            </li>
            <li class="item__detail">
              <section>
                <span class="detail__title"><i class="icon-smartphone mr-5"></i>绑定手机</span><br>
                <span class="detail__text">设置您的绑定手机号码</span>
              </section>
              <section>
                <el-button>修改</el-button>
              </section>
            </li>
            <li class="item__detail">
              <section>
                <span class="detail__title"><i class="icon-email mr-5"></i>绑定邮箱</span><br>
                <span class="detail__text">设置您的绑定邮箱</span>
              </section>
              <section>
                <el-button>修改</el-button>
              </section>
            </li>
          </ul>
        </section>
        <section class="content__item" v-else>
          <p class="item__title">通知设置</p>
          <ul>
            <li class="item__detail">
              <section>
                <span class="detail__title"><i class="icon-person mr-5"></i>系统消息</span><br>
                <span class="detail__text">系统性的通知或者更新消息</span>
              </section>
              <section>
                <el-switch
                  v-model="noticeSetting.system"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </section>
            </li>
            <li class="item__detail">
              <section>
                <span class="detail__title"><i class="icon-smartphone mr-5"></i>帐号消息</span><br>
                <span class="detail__text">帐号变更的通知消息</span>
              </section>
              <section>
                <el-switch
                  v-model="noticeSetting.account"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </section>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SecuritySetting',
  data() {
    return {
      navList: [
        {key: 1, name: '安全设置'},
        {key: 2, name: '通知设置'}
      ],
      navActive: 1,
      noticeSetting: {
        system: true,
        account: true
      }
    }
  },
  methods: {
    
  }
}
</script>
<style scoped>
.main__securitySetting {
  display: flex;
}
.main__securitySetting .securitySettingBox {
  flex: 1;
  display: flex;
  border-radius: 8px;
  background: #fff;
}
.main__securitySetting .securitySetting__nav {
  width: 225px;
  margin: 20px 0;
  border-right: 1px solid #EBEEF5;
}

.securitySetting__nav .nav__item {
  position: relative;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  cursor: pointer;
}
.securitySetting__nav .nav__item.is-active {
  color: #409EFF;
  background: #ECF5FF;
}
.securitySetting__nav .nav__item.is-active::after {
  position: absolute;
  right: 0;
  top: 0;
  content: '';
  width: 2px;
  height: 40px;
  background-color: #409EFF;
}
.securitySetting__nav .nav__item:hover {
  color: #409EFF;
}
.main__securitySetting .securitySetting__content {
  flex: 1;
  padding: 20px;
}
.securitySetting__content .content__item .item__title {
  margin: 8px 0 20px;
  font-size: 20px;
  color: #303133;
}
.securitySetting__content .content__item .item__detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  line-height: 30px;
  font-size: 14px;
  border-bottom: 1px solid #EBEEF5;
}
.content__item .item__detail .detail__title {
  font-weight: 600;
  color: #606266;
}
.content__item .item__detail .detail__text {
  color: #2f2f2f;
  font-weight: 400;
}
</style>

