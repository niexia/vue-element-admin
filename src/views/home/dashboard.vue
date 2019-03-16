<template>
  <div class="main__dashboard">
    <section class="row row-1">
      <div class="col col-1 mr-20">
        <div class="personal__info">
          <img src="../../assets/imgs/icon__logo.jpg">
          <p>admin</p>
          <p>部门: 技术部</p>
          <p>个人签名: Seas the world</p>
        </div>
        <div class="personal__tags">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            :type="tag.type">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
      <div class="col col-2">
        代办事项
      </div>
    </section>
    <section class="row row-2">
      <div class="col col-1 mr-20">访问走势</div>
      <div class="col col-2">发布次数</div>
    </section>
    <section class="row row-3">
      <div class="col col-1 mr-20">时间分配</div>
      <div class="col col-2">任务状态</div>
    </section>
    <!-- <v-chart 
      :autoresize="true" 
      :options="polar"/> -->
  </div>
</template>
<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default {
  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ],
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
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
  width: 60%;
  display: flex;
  align-items: center;
}
.main__dashboard .personal__info {
  width: 50%;
}
.main__dashboard .personal__info img {
  width: 60px;
  height: 60px;;
}
.main__dashboard .personal__tags {
  width: 50%;
}
</style>