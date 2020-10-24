<template>
  <div class="main__dashboard">
    <section class="row row-1">
      <div class="col col-1 mr-20">
        <div class="personal__info">
          <img src="../../assets/imgs/icon__logo.jpg">
          <div>
            <span class="info__name">niexias</span><br>
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
            <el-badge :value="12" class="todo__item" type="primary">
              <el-button size="small">公众号评论</el-button>
            </el-badge>
            <el-badge :value="3" class="todo__item" type="warning">
              <el-button size="small">客户回复</el-button>
            </el-badge>
            <el-badge :value="5" class="todo__item">
              <el-button size="small">会议</el-button>
            </el-badge>
          </div>
          <el-button class="todo__button" type="primary" size="small" plain>发送通知</el-button>
        </div>
      </div>
    </section>
    <section class="row row-2">
      <div class="col col-1 mr-20">
        <p>访问走势</p>
        <v-chart 
          :autoresize="true" 
          :options="visitTrade"
        />
      </div>
      <div class="col col-2">
        <p>发布次数</p>
        <v-chart 
          :autoresize="true" 
          :options="releaseTime"
        />
      </div>
    </section>
    <section class="row row-3">
      <div class="col col-1 mr-20">
        <p>时间分配</p>
        <v-chart 
          :autoresize="true" 
          :options="timeManagement"
        />
      </div>
      <div class="col col-2">
        <p>任务状态</p>
        <v-chart 
          :autoresize="true" 
          :options="taskState"
        />
      </div>
    </section>
  </div>
</template>
<script>
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
export default {
  data () {
    var data = [
      ["2019-01",80], ["2019-02",129], ["2019-03",135], ["2019-04",170],
      ["2019-03",140], ["2019-03",150], ["2019-03",138], ["2019-03",180],
      ["2019-03",150], ["2019-03",120], ["2019-03",140], ["2019-03",135]
    ];
    var dateList = data.map(function (item) {
        return item[0];
    });
    var valueList = data.map(function (item) {
        return item[1];
    });
    return {
      // 标签
      tags: ['JavaScaipt', 'Vue', '前端工程化', 'Express', 'Java', 'Spring', 'React?'],
      inputVisible: false,
      inputValue: '',
      // 访问走势
      visitTrade: {
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
      }, 
      // 发布次数
      releaseTime: {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
        ]
      },
      // 时间分配
      timeManagement: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left'
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:335, name:'测试', selected:true},
              {value:679, name:'前端'},
              {value:1548, name:'后端'}
            ]
          },
          {
            name:'访问来源',
            type:'pie',
            radius: ['40%', '55%'],
            data:[
              {value:335, name:'客户沟通'},
              {value:310, name:'需求整体'},
              {value:234, name:'需求评审'},
              {value:135, name:'原型设计'},
              {value:1048, name:'开发'},
              {value:251, name:'测试'},
              {value:147, name:'回归'},
              {value:102, name:'发布'}
            ]
          }
        ]
      },
      // 任务状态
      taskState: {
        tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['完成']
        },
        series: [{
          name: '客户对接',
          type: 'pie',
          radius: ['40%', '50%'],
          center: ['16.5%', '50%'],
          color:'#FF8C00',
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 20,
            name: '占有率',
            label: {
              normal: {
                formatter: '{d} %',
                textStyle: {
                  fontSize: 14
                }
              }
            }
          }, {
            value: 80,
            name: '占位',
            label: {
              normal: {
                formatter: '\n完成率',
                textStyle: {
                  color: '#555',
                  fontSize: 14
                }
              }
            },
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#aaa'
              },
              emphasis: {
                color: '#aaa'
              }
            },
            hoverAnimation: false
         }]
        },{
          name: '客户对接',
          type: 'pie',
          radius: ['40%', '50%'],
          center: ['50%', '50%'],
          color:'#FF8C00',
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 20,
            name: '占有率',
            label: {
              normal: {
                formatter: '{d} %',
                textStyle: {
                  fontSize: 14
                }
              }
            }
          }, {
            value: 80,
            name: '占位',
            label: {
              normal: {
                formatter: '\n完成率',
                textStyle: {
                  color: '#555',
                  fontSize: 14
                }
              }
            },
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#aaa'
              },
              emphasis: {
                color: '#aaa'
              }
            },
            hoverAnimation: false
         }]
        },{
          name: '客户对接',
          type: 'pie',
          radius: ['40%', '50%'],
          center: ['83.2%', '50%'],
          color:'#FF8C00',
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 20,
            name: '占有率',
            label: {
              normal: {
                formatter: '{d} %',
                textStyle: {
                  fontSize: 14
                }
              }
            }
          }, {
            value: 80,
            name: '占位',
            label: {
              normal: {
                formatter: '\n完成率',
                textStyle: {
                  color: '#555',
                  fontSize: 14
                }
              }
            },
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#aaa'
              },
              emphasis: {
                color: '#aaa'
              }
            },
            hoverAnimation: false
         }]
        }]
      }
    }
  },
  methods: {
    /**
     * 删除标签
     * 
     * @param {String} tag 要删除的标签名称
     */
    handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
    /**
     * 新增标签
     */
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    /**
     * 确定新增标签
     */
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
<style lang="scss">
.main__dashboard {
  overflow-x: hidden;
  .echarts {
    width: 100%;
    height: 100%;
  }
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    &:nth-child(1) {
      height: 200px;
    }
    &:nth-child(2) {
      height: 300px;
    }
    &:nth-child(3) {
      height: 300px;
      margin-bottom: 0;
    }
    .col {
      width: 50%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 8px;
    }
    .col:last-child {
      flex: 1;
    }
    &.row-1 .col-1 {
      width: 70%;
      display: flex;
      align-items: center;
    }
  }
  .personal__info {
    width: 50%;
    display: flex;
    align-items: center;
    line-height: 22px;
    img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      border-radius: 50%;
    }
    .info__name {
      font-size: 20px;
      color: #303133;
    }
    .info__detail {
      font-size: 12px;
      color: #909399;
    }
  }
  .personal__tags {
    width: 50%;
    overflow-y: auto;
    .el-tag {
      margin: 0 10px 10px 0;
    }
    .button-new-tag {
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
    }
  }
  .personal__todo {
    .todo__info {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding: 20px 0px 20px;
      border-bottom: 1px solid #F2F6FC;
    }
    .todo__button {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>