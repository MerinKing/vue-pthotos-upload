<!--主界面设计  -->
<template>
  <div>
    <el-container>
      <el-header>
        <span>郑州东站票额利用率统计分析</span>
      </el-header>
      <div>
        <br />

        <el-row>
          <el-col :span="24">
            <span>日期范围:</span>
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
            <span>经过站:</span>
            <selectStation ref="selectedStation"></selectStation>
            <el-button @click="btnQueryClick()" type="primary">查询</el-button>
            <!-- <el-button type="primary">
              导出
              <i class="el-icon-document el-icon--right"></i>
            </el-button>-->
            <export2excel
              :list="dataList"
              :filename="getExportExcelFileName"
              :tHeader="tHeader"
              :tValue="tValue"
            ></export2excel>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="text-align:center;">
          <el-col :span="4"></el-col>
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
          <!-- <el-col :span="4" style="min-width:220px;">
            <el-checkbox v-model="isLinKe" label="临客" border size="small"></el-checkbox>
            <el-checkbox v-model="isChengJi" label="城际车" border size="small"></el-checkbox>
          </el-col>-->
          <!-- <el-col :span="3" style="min-width:220px;">
            <el-checkbox-group v-model="checkedGroupFangXiang" size="small">
              <el-checkbox-button label="东" border></el-checkbox-button>
              <el-checkbox-button label="西" border></el-checkbox-button>
              <el-checkbox-button label="南" border></el-checkbox-button>
              <el-checkbox-button label="北" border></el-checkbox-button>
            </el-checkbox-group>
          </el-col>-->
          <el-col :span="3" style="min-width:220px;">
            <el-checkbox-group v-model="checkedGroupTrainStatus" :min="1" size="small">
              <el-checkbox-button label="始发" border></el-checkbox-button>
              <el-checkbox-button label="途径" border></el-checkbox-button>
            </el-checkbox-group>
          </el-col>

          <el-col :span="6" style="min-width:500px;">
            <el-checkbox-group v-model="checkedGroupZhou" :min="1" :max="7" size="small">
              <el-checkbox-button label="周一" border></el-checkbox-button>
              <el-checkbox-button label="周二" border></el-checkbox-button>
              <el-checkbox-button label="周三" border></el-checkbox-button>
              <el-checkbox-button label="周四" border></el-checkbox-button>
              <el-checkbox-button label="周五" border></el-checkbox-button>
              <el-checkbox-button label="周六" border></el-checkbox-button>
              <el-checkbox-button label="周日" border></el-checkbox-button>
            </el-checkbox-group>
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
      </div>
      <div>
        <br />
        <table1 :tableData="tableData3" ref="table1"></table1>
      </div>
      <el-main>
        <div id="myChart" :style="{width: '1000px', height: '300px'}"></div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import table1 from "./Table";
import selectStation from "./SelectStation";
import { Loading } from "element-ui";
import export2excel from "./Export2Excel";

export default {
  name: "MainPage",
  components: { table1, selectStation, export2excel },
  data() {
    return {
      selectedStation: "",
      valueLinKe: "包含临客车",
      valueChengJi: "包含城际车",
      isLinKe: true,
      isChengJi: true,
      checkedGroupTrainStatus: ["始发", "途径"],
      dataList: [
        {
          date: "yyyy-MM-dd",
          TrainName: "--",
          onstation: "--",
          Send_Station: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0",
          Send_Number: "0",
          piaoELv: "--"
        }
      ], //导出Excel数据
      tHeader: [
        "日期",
        "车次",
        "上车站",
        "运行区间",
        "所属局",
        "到点",
        "发点",
        "票额",
        "上车人数",
        "利用率"
      ],
      tValue: [
        "date",
        "TrainName",
        "onstation",
        "runInterval",
        "belongBureau",
        "arriveTime",
        "leaveTime",
        "averagePiaoe",
        "averageSC",
        "piaoELv"
      ],
      // value6: [new Date().addDate(-5), new Date().addDate(-1)],
      value6: [new Date("2019-07-25"), new Date("2019-07-30")],
      value_TimePicker: [
        new Date(2016, 9, 10, 8, 40),
        new Date(2016, 9, 10, 9, 40)
      ],
      tableData3: [],
      totalData: [],
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
      checkedGroupFangXiang: ["东", "西", "南", "北"]
    };
  },
  mounted() {
    this.LoadingData();
    this.getTotalData();
    // this.dde = new Date();
    // this.dde.setMonth(new Date().getMonth() - 1);

    // this.drawLine();
  },
  computed: {
    getExportExcelFileName: function() {
      let _jingGuo_stationName = this.selectedStation;
      if (_jingGuo_stationName != "") {
        _jingGuo_stationName = "经过站-" + _jingGuo_stationName;
      }

      let _startDate = "";
      let _stopDate = "";
      let _startTime = "";
      let _stopTime = "";
      let _weekRange = this.checkedGroupZhou.join("-");
      let _isChengJi = this.valueChengJi;
      let _isLinKe = this.valueLinKe;
      let _trainStatus = this.checkedGroupTrainStatus.join("-");
      if (this.value6) {
        _startDate = this.value6[0].pattern("yyyy-MM-dd");
        _stopDate = this.value6[1].pattern("yyyy-MM-dd");
      }
      if (this.value_TimePicker) {
        _startTime = this.value_TimePicker[0].pattern("HH:mm");
        _stopTime = this.value_TimePicker[1].pattern("HH:mm");
      }

      let _FileName =
        "郑州东站票额数据分析[(" +
        _startDate +
        "~" +
        _stopDate +
        ")(" +
        _weekRange +
        ")(" +
        _isChengJi +
        ")(" +
        _isLinKe +
        ")(" +
        _trainStatus +
        ")" +
        _jingGuo_stationName +
        "]";
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
      if (this.value_TimePicker) {
        console.log(this.value_TimePicker[0].pattern("HH:mm"));
      }

      // console.log(this.checkedGroupZhou);
      console.log(this.$refs["selectedStation"].value);
      this.LoadingData();
      this.getTotalData();
    },
    open5(_content) {
      this.$notify.info({
        title: "消息",
        message: _content
      });
    },

    LoadingData: function() {
      let _jingGuo_stationName = this.$refs["selectedStation"].value;
      this.selectedStation = _jingGuo_stationName;
      let _startDate = "";
      let _stopDate = "";
      let _startTime = "";
      let _stopTime = "";
      let _weekRange = this.checkedGroupZhou.join(",");
      let _isChengJi = this.valueChengJi;
      let _isLinKe = this.valueLinKe;
      let _trainStatus = this.checkedGroupTrainStatus.join(",");
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
          TYPE: "getTableListData",
          startdate: _startDate,
          stopdate: _stopDate,
          starttime: _startTime,
          stoptime: _stopTime,
          weekRange: _weekRange,
          jingGuoStation: _jingGuo_stationName,
          isChengJi: _isChengJi,
          trainStatus: _trainStatus,
          isLinKe: _isLinKe
        },
        url: config.getTableData
      })
        .then(resp => {
          var result = resp.data;
          console.log(result);
          // this.tableData3 = result;

          if (result == "-1") {
            result = [];
          }
          this.$refs["table1"].tableData3 = result;
          this.dataList = result;
          // console.log();
          loadingInstance1.close();
        })
        .catch(resp => {
          loadingInstance1.close();
          console.log("请求失败()：" + resp + "," + respText);
          this.open5("请求失败,请检查网络！");
        });
    },

    getTotalData: function() {
      // let loadingInstance2 = Loading.service({ fullscreen: true });
      let _jingGuo_stationName = this.$refs["selectedStation"].value;
      let _startDate = "";
      let _stopDate = "";
      let _startTime = "";
      let _stopTime = "";
      let _weekRange = this.checkedGroupZhou.join(",");
      let _isChengJi = this.valueChengJi;
      let _isLinKe = this.valueLinKe;
      let _trainStatus = this.checkedGroupTrainStatus.join(",");
      if (this.value6) {
        _startDate = this.value6[0].pattern("yyyy-MM-dd");
        _stopDate = this.value6[1].pattern("yyyy-MM-dd");
      }
      if (this.value_TimePicker) {
        _startTime = this.value_TimePicker[0].pattern("HH:mm");
        _stopTime = this.value_TimePicker[1].pattern("HH:mm");
      }
      this.$axios({
        method: "get",
        params: {
          TYPE: "TOTAL",
          startdate: _startDate,
          stopdate: _stopDate,
          starttime: _startTime,
          stoptime: _stopTime,
          weekRange: _weekRange,
          jingGuoStation: _jingGuo_stationName,
          isChengJi: _isChengJi,
          trainStatus: _trainStatus,
          isLinKe: _isLinKe
        },
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
            arrX[i] = result[i].dates2;
            arrY[i] = result[i].sendNumTotal;
            arrY2[i] = result[i].averagePiaoeTotal;
            arrY3[i] = result[i].piaoELvfromTotal2;
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
          console.log("请求失败()：" + resp + "," + respText);
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
        toolbox: {
          feature: {
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          axisLabel: { interval: 0, rotate: 30 },
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
            name: "上车人数",
            type: "bar",
            data: this.Y_DATA //[5, 20, 36, 10, 10, 20]
          },
          {
            name: "票额人数",
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
.el-row {
  min-width: 1000px;
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

body > .el-container {
  margin-bottom: 40px;
}
.el-col {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
