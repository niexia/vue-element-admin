<template>
  <div class="main__dashboard">
    <section class="row row-1">
      <div class="col col-1 mr-20">
        <div class="personal__info">
          <img src="../../assets/imgs/icon__logo.jpg">
          <div>
            <span class="info__name">Yang</span><br>
            <span class="info__detail">部门: 技术部</span><br>
            <span class="info__detail">个人签名: Seas the world</span>
          </div>
        </div>
        <div class="personal__tags">
          <el-tag
            :key="tag"
            v-for="tag in tags"
            type="info"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
      </div>
      <div class="col col-2">
        <div class="personal__todo">
          <p class="title">代办事项</p>
          <div class="todo__info">
            <el-badge :value="12" class="todo__item"  type="primary">
              <el-button size="small">公众号评论</el-button>
            </el-badge>
            <el-badge :value="3" class="todo__item"  type="primary">
              <el-button size="small">客户回复</el-button>
            </el-badge>
            <el-badge :value="5" class="todo__item"  type="primary">
              <el-button size="small">会议</el-button>
            </el-badge>
          </div>
          <el-button class="todo__button" type="primary" size="small">发送通知</el-button>
        </div>
      </div>
    </section>
    <section class="row row-2">
      <div class="col col-1 mr-20">
        <p>访问走势</p>
        <v-chart 
          :autoresize="true" 
          :options="line"
        />
      </div>
      <div class="col col-2">
        <p>发布次数</p>
        <v-chart 
          :autoresize="true" 
          :options="line"
        />
      </div>
    </section>
    <section class="row row-3">
      <div class="col col-1 mr-20">
        <p>时间分配</p>
        <v-chart 
          :autoresize="true" 
          :options="line"
        />
      </div>
      <div class="col col-2">
        <p>任务状态</p>
        <v-chart 
          :autoresize="true" 
          :options="line"
        />
      </div>
    </section>
  </div>
</template>
<script>
import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'

export default {
  data () {
    var data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];
    var dateList = data.map(function (item) {
        return item[0];
    });
    var valueList = data.map(function (item) {
        return item[1];
    });
    return {
      tags: ['JavaScaipt', 'Vue', '前端工程化', 'Express', 'Java', 'Spring', 'React?'],
      inputVisible: false,
      inputValue: '',
      line: {
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        }],
        title: [{
          left: 'center',
          text: 'Gradient along the y axis'
        }],
        tooltip: {trigger: 'axis'},
        xAxis: [{data: dateList}],
        yAxis: [{splitLine: {show: false}}],
        grid: [
          {bottom: '10%'},
          {top: '0%'}
        ],
        series: [{
          type: 'line',
          showSymbol: false,
          data: valueList
        }]
      }
    }
  },
  methods: {
    handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>
<style>
.main__dashboard .echarts {
  width: 100%;
  height: 100%;
}
.main__dashboard .row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.main__dashboard .row:nth-child(1) {
  height: 200px;
}
.main__dashboard .row:nth-child(2) {
  height: 300px;
}
.main__dashboard .row:nth-child(3) {
  height: 300px;
  margin-bottom: 0;
}
.main__dashboard .row .col {
  width: 50%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
}
.main__dashboard .row .col:last-child {
  flex: 1;
}
.main__dashboard .row-1 .col-1 {
  width: 70%;
  display: flex;
  align-items: center;
}
.main__dashboard .personal__info {
  width: 50%;
  display: flex;
  align-items: center;
  line-height: 22px;
}
.main__dashboard .personal__info img {
  width: 80px;
  height: 80px;
  margin-right: 10px;;
}
.main__dashboard .personal__info .info__name {
  font-size: 20px;
  color: #303133;
}
.main__dashboard .personal__info .info__detail {
  font-size: 12px;
  color: #909399;
}
.main__dashboard .personal__tags {
  width: 50%;
  overflow-y: auto;
}
.main__dashboard .personal__tags .el-tag {
    margin: 0 10px 10px 0;
  }
.main__dashboard .personal__tags .button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.main__dashboard .personal__tags .input-new-tag {
  width: 90px;
}
.personal__todo .todo__info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 0px 20px;
  border-bottom: 1px solid #F2F6FC;
}
.personal__todo .todo__button {
  margin-top: 20px;
  width: 100%;
}
</style>