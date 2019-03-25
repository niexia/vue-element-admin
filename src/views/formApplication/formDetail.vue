<template>
  <div class="main__formDetail">
    <div class="cardBox">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(info, index) in cardList" :key="index">
          <card :info="info"></card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormDetail',
  components: {
    Card: {
      props: {
        info: {
          required: true,
          type: Object,
          default: () => {
            return {
              title: '兴趣',
              content: '',
              imgpath: '',
            }
          }
        }
      },
      render: function(createElement) {
        return createElement(
          'div', 
          {
            'class': 'card__item'
          }, 
          [
            createElement('div', {
              class: 'img',
              style: {
                backgroundImage: `url(${this.info.imgpath})`
              }
            }),
            createElement('h1', this.info.title),
            createElement('p', this.info.content)
          ]
        )
      }
    }
  },
  data() {
    return {
      cardList: [{
        title: 'To',
        content: '我是个小人物，生活在社会最底层，没有人会注意到我，孤独一生，没有地位没有爱情，也没有希望。如果我能够拯救一个自己爱上的遥远的美丽世界，那这一辈子至少没有白活。',
        imgpath: require('./../../assets/imgs/card__img.jpg')
      }, {
        title: 'To',
        content: '我是个小人物，生活在社会最底层，没有人会注意到我，孤独一生，没有地位没有爱情，也没有希望。如果我能够拯救一个自己爱上的遥远的美丽世界，那这一辈子至少没有白活。',
        imgpath: require('./../../assets/imgs/card__img.jpg')
      }, {
        title: 'To',
        content: '我是个小人物，生活在社会最底层，没有人会注意到我，孤独一生，没有地位没有爱情，也没有希望。如果我能够拯救一个自己爱上的遥远的美丽世界，那这一辈子至少没有白活。',
        imgpath: require('./../../assets/imgs/card__img.jpg')
      }, {
        title: 'To',
        content: '我是个小人物，生活在社会最底层，没有人会注意到我，孤独一生，没有地位没有爱情，也没有希望。如果我能够拯救一个自己爱上的遥远的美丽世界，那这一辈子至少没有白活。',
        imgpath: require('./../../assets/imgs/card__img.jpg')
      }, {
        title: 'To',
        content: '我是个小人物，生活在社会最底层，没有人会注意到我，孤独一生，没有地位没有爱情，也没有希望。如果我能够拯救一个自己爱上的遥远的美丽世界，那这一辈子至少没有白活。',
        imgpath: require('./../../assets/imgs/card__img.jpg')
      }, {
        title: 'To',
        content: '我是个小人物，生活在社会最底层，没有人会注意到我，孤独一生，没有地位没有爱情，也没有希望。如果我能够拯救一个自己爱上的遥远的美丽世界，那这一辈子至少没有白活。',
        imgpath: require('./../../assets/imgs/card__img.jpg')
      }]
    }
  },
  methods: {
    
  }
}
</script>
<style>
.main__formDetail .cardBox .card__item {
  height: 400px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 8px;
}
.main__formDetail .cardBox .card__item .img {
  width: 100%;
  height: 260px;
  background-position: center center;
  background-size: cover;
}
.main__formDetail .cardBox .card__item h1 {
  line-height: 24px;
  padding: 20px 10px 0;
  font-size: 18px;
  color: #606266;
}
.main__formDetail .cardBox .card__item p {
  line-height: 22px;
  padding: 5px 10px 20px;
  font-size: 14px;
  color: #606266;
  opacity: 0.6;
}
</style>

