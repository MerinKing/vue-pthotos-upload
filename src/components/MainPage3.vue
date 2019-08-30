<!--主界面设计  -->
<template>
  <div>
    <el-container>
      <el-header>
        <span>郑州东站车次去向票额利用率统计分析</span>
      </el-header>
      <div>
        <br />

        <el-row>
          <el-col :span="24">
            <span>日期:</span>
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <span>发点范围:</span>
            <el-time-picker
              is-range
              format="HH:mm"
              v-model="value_TimePicker"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
            <!-- <span>经过站:</span>
            <selectStation ref="selectedStation"></selectStation>-->

            <el-button @click="btnQueryClick()" type="primary">查询</el-button>
            <export2excel
              :list="dataList"
              :filename="getExportExcelFileName"
              :tHeader="tHeader"
              :tValue="tValue"
            ></export2excel>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="3" style="min-width:240px;">
            <el-checkbox-group v-model="checkedGroupGuanZhi" :min="1" :max="2" size="small">
              <el-checkbox label="管内" border></el-checkbox>
              <el-checkbox label="管外" border></el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="6" style="min-width:370px;">
            <span>临客:</span>
            <el-select v-model="valueLinKe" placeholder="请选择" size="small" style="width:130px;">
              <el-option label="包含临客车" value="包含临客车"></el-option>
              <el-option label="不包含临客车" value="不包含临客车"></el-option>
              <el-option label="仅包含临客车" value="仅包含临客车"></el-option>
            </el-select>
            <span>城际:</span>
            <el-select v-model="valueChengJi" placeholder="请选择" size="small" style="width:130px;">
              <el-option label="包含城际车" value="包含城际车"></el-option>
              <el-option label="不包含城际车" value="不包含城际车"></el-option>
              <el-option label="仅包含城际车" value="仅包含城际车"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="min-width:220px;">
            <el-checkbox-group v-model="checkedGroupTrainStatus" :min="1" size="small">
              <el-checkbox-button label="始发" border></el-checkbox-button>
              <el-checkbox-button label="途径" border></el-checkbox-button>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </div>
      <div>
        <br />
        <table1 :tableData="tableData3" ref="table1"></table1>
      </div>
      <el-main>
        <div id="myChart" :style="{width: '1200px', height: '300px'}"></div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import table1 from "./TableThree";
import selectStation from "./SelectStation";
import { Loading } from "element-ui";
import export2excel from "./Export2Excel";
export default {
  name: "MainPage",
  components: { table1, selectStation, export2excel },
  data() {
    return {
      value_TimePicker: [
        new Date(2016, 9, 10, 8, 40),
        new Date(2016, 9, 10, 9, 40)
      ],
      // value6: [new Date().addDate(-5), new Date().addDate(-1)],
      value6: [new Date("2019-07-25"), new Date("2019-07-30")],
      valueLinKe: "包含临客车",
      valueChengJi: "包含城际车",
      checkedGroupTrainStatus: ["始发", "途径"],
      tableData3: [],
      totalData: [],
      dataList: [
        {
          Send_Station: "XXXX",
          GuanZhiStatus: "XXXX",
          Send_Number: "0",
          averagePiaoe: "0",
          piaoELv: "--"
        }
      ], //导出Excel数据
      tHeader: ["去向车站", "是否管内", "去向人数", "票额", "利用率"],
      tValue: [
        "Send_Station",
        "GuanZhiStatus",
        "Send_Number",
        "averagePiaoe",
        "piaoELv"
      ],
      X_DATA: [],
      Y_DATA: [],
      Y2_DATA: [],
      Y3_DATA: [],
      checkedGroupZhou: [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日"
      ],
      checkedGroupGuanZhi: ["管内", "管外"]
    };
  },
  mounted() {
    this.LoadingData();
    // this.getTotalData();
    // this.dde = new Date();
    // this.dde.setMonth(new Date().getMonth() - 1);

    // this.drawLine();
  },
  computed: {
    getExportExcelFileName: function() {
      let _startDate = "";
      let _stopDate = "";
      let _startTime = "";
      let _stopTime = "";
      // let _weekRange = this.checkedGroupZhou.join(",");
      let _isChengJi = this.valueChengJi;
      let _isLinKe = this.valueLinKe;
      let _trainStatus = this.checkedGroupTrainStatus.join(",");

      let _GuanZHi = this.checkedGroupGuanZhi.join(",");
      if (this.value6) {
        _startDate = this.value6[0].pattern("yyyy-MM-dd");
        _stopDate = this.value6[1].pattern("yyyy-MM-dd");
      }
      if (this.value_TimePicker) {
        _startTime = this.value_TimePicker[0].pattern("HH:mm");
        _stopTime = this.value_TimePicker[1].pattern("HH:mm");
      }

      let _FileName =
        "郑州东站票额数据分析[利用率前十(" +
        _startDate +
        "~" +
        _stopDate +
        ")(" +
        _startTime +
        "~" +
        _stopTime +
        ")(" +
        _isChengJi +
        ")(" +
        _isLinKe +
        ")(" +
        _trainStatus +
        ")]";
      console.log(_FileName);
      return _FileName;
    }
  },
  methods: {
    btnQueryClick: function() {
      console.log("this is a Test");
      console.log(this.value6);
      if (this.value6) {
        let startDate = this.value6[0].pattern("yyyy-MM-dd");
        let stopDate = this.value6[1].pattern("yyyy-MM-dd");
        console.log(startDate);
        console.log(stopDate);
      }

      //   console.log(this.$refs["selectedStation"].value);
      this.LoadingData();
      //this.getTotalData();
    },
    open5(_content) {
      this.$notify.info({
        title: "消息",
        message: _content
      });
    },

    LoadingData: function() {
      // let _jingGuo_stationName = this.$refs["selectedStation"].value;
      // this.selectedStation = _jingGuo_stationName;
      let _startDate = "";
      let _stopDate = "";
      let _startTime = "";
      let _stopTime = "";
      // let _weekRange = this.checkedGroupZhou.join(",");
      let _isChengJi = this.valueChengJi;
      let _isLinKe = this.valueLinKe;
      let _trainStatus = this.checkedGroupTrainStatus.join(",");

      let _GuanZHi = this.checkedGroupGuanZhi.join(",");
      if (this.value6) {
        _startDate = this.value6[0].pattern("yyyy-MM-dd");
        _stopDate = this.value6[1].pattern("yyyy-MM-dd");
      }
      if (this.value_TimePicker) {
        _startTime = this.value_TimePicker[0].pattern("HH:mm");
        _stopTime = this.value_TimePicker[1].pattern("HH:mm");
      }

      let loadingInstance1 = Loading.service({ fullscreen: true });
      this.$axios({
        method: "get",
        params: {
          TYPE: "getTableThreeListData",
          startdate: _startDate,
          stopdate: _stopDate,
          starttime: _startTime,
          stoptime: _stopTime,
          isChengJi: _isChengJi,
          trainStatus: _trainStatus,
          guanzhi: _GuanZHi,
          isLinKe: _isLinKe
        },
        url: config.getTableData
      })
        .then(resp => {
          var result = resp.data;
          console.log(result);
          // this.tableData3 = result;
          if (result == "-1") result = [];
          this.$refs["table1"].tableData3 = result;
          this.dataList = result;
          // console.log();
          var arrX = [];
          var arrY = [];
          var arrY2 = [];
          var arrY3 = [];
          for (var i = 0; i < result.length; i++) {
            arrX[i] = result[i].Send_Station;
            arrY[i] = result[i].Send_Number;
            arrY2[i] = result[i].averagePiaoe;
            arrY3[i] = result[i].piaoELv2;
          }
          this.X_DATA = arrX;
          this.Y_DATA = arrY;
          this.Y2_DATA = arrY2;
          this.Y3_DATA = arrY3;
          this.drawLine();
          loadingInstance1.close();
        })
        .catch(resp => {
          loadingInstance1.close();
          console.log("请求失败()：" + resp + "," + resp.statusText);
          this.open5("请求失败,请检查网络！");
        });
    },

    getTotalData: function() {
      // let loadingInstance2 = Loading.service({ fullscreen: true });
      this.$axios({
        method: "get",
        params: { TYPE: "TOTAL" },
        url: config.getTableData
      })
        .then(resp => {
          var result = resp.data;
          // console.log(result);
          this.totalData = result;
          var arrX = [];
          var arrY = [];
          var arrY2 = [];
          var arrY3 = [];
          for (var i = 0; i < result.length; i++) {
            arrX[i] = result[i].Send_Station;
            arrY[i] = result[i].Send_Number;
            arrY2[i] = result[i].averagePiaoe;
            arrY3[i] = result[i].piaoELv2;
          }
          this.X_DATA = arrX;
          this.Y_DATA = arrY;
          this.Y2_DATA = arrY2;
          this.Y3_DATA = arrY3;
          // console.log(this.X_DATA);
          // console.log(this.Y_DATA);

          this.drawLine();
          // loadingInstance2.close();
        })
        .catch(resp => {
          // loadingInstance2.close();
          console.log("请求失败()：" + resp.status + "," + resp.statusText);
          this.open5("请求失败,请检查网络！");
        });
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "票额数据分析" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          textStyle: { align: "left" }
        },
        xAxis: {
          axisLabel: { interval: 0, rotate: 0 },
          data: this.X_DATA // ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: [
          { type: "value", name: "人数" },
          {
            type: "value",
            name: "利用率",
            min: 0,
            max: 100,
            position: "right",
            axisLine: {
              lineStyle: {
                color: "blue"
              }
            },
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "去向人数",
            type: "bar",
            data: this.Y_DATA //[5, 20, 36, 10, 10, 20]
          },
          {
            name: "额定人数",
            type: "bar",
            data: this.Y2_DATA //[5, 20, 36, 10, 10, 20]
          },
          {
            name: "利用率",
            type: "line",
            yAxisIndex: 1,
            // itemStyle: { color:'' },
            data: this.Y3_DATA //[5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
  可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
  Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  var week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? "星期" : "周") : "") +
        week[this.getDay() + ""]
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

Date.prototype.addDate = function(days) {
  this.setDate(this.getDate() + days);
  var m = this.getMonth() + 1;
  return new Date(this.getFullYear() + "-" + m + "-" + this.getDate());
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-row {
  min-width: 1200px;
}
.el-col {
  margin-top: 10px;
  margin-bottom: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
