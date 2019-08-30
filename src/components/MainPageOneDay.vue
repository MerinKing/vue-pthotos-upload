<!--主界面设计 一天24小时规律查看 -->
<template>
  <div>
    <el-container>
      <el-header>
        <span>郑州东站票额分时段利用率统计分析</span>
      </el-header>
      <div>
        <br />

        <el-row>
          <el-col :span="24">
            <span>日期:</span>
            <el-date-picker v-model="valueSelectedDate" type="date" placeholder="选择日期"></el-date-picker>
            <span>经过站:</span>
            <selectStation ref="selectedStation"></selectStation>
            <el-button @click="btn_QueryClick()" type="primary">查询</el-button>
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

        <el-row>
          <el-col :span="7"></el-col>
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
        <div id="myChart" :style="{width: '1400px', height: '300px'}"></div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import table1 from "./TableOneDay";
import selectStation from "./SelectStation";
import export2excel from "./Export2Excel";
export default {
  name: "MainPage",
  components: { table1, selectStation, export2excel },
  data() {
    return {
      selectedStation: "",
      valueLinKe: "包含临客车",
      valueChengJi: "包含城际车",
      checkedGroupTrainStatus: ["始发", "途径"],
      // valueSelectedDate: new Date().addDate(-1),
      valueSelectedDate: new Date("2019-07-29"),
      tableData3: [],
      totalData: [],
      dataList: [
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        }
      ], //导出Excel数据
      tHeader: ["日期", "时间段", "上车人数", "票额", "利用率"],
      tValue: [
        "date",
        "TimeDuan",
        "averageSCTotal",
        "averagePiaoeTotal",
        "piaoELv"
      ],
      X_DATA: [],
      Y_RS_DATA: [],
      Y_PL_DATA: [],
      Y_LYL_DATA: []
    };
  },
  computed: {
    getExportExcelFileName: function() {
      let _jingGuo_stationName = this.selectedStation;
      if (_jingGuo_stationName != "") {
        _jingGuo_stationName = "经过站-" + _jingGuo_stationName;
      }
      let _selectedDate = "";
      let _stopDate = "";
      let _startTime = "";
      let _stopTime = "";
      // let _weekRange = this.checkedGroupZhou.join(",");
      let _isChengJi = this.valueChengJi;
      let _isLinKe = this.valueLinKe;
      let _trainStatus = this.checkedGroupTrainStatus.join(",");
      if (this.valueSelectedDate) {
        _selectedDate = this.valueSelectedDate.pattern("yyyy-MM-dd");
      }

      let _FileName =
        "郑州东站票额数据分析[(" +
        _selectedDate +
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
  mounted() {
    this.LoadingData();
    // this.getTotalData();
    // this.dde = new Date();
    // this.dde.setMonth(new Date().getMonth() - 1);

    // this.drawLine();
  },
  methods: {
    btn_QueryClick: function() {
      // console.log("this is a Test");
      console.log(this.valueSelectedDate);
      if (this.valueSelectedDate) {
        // let startDate = this.valueSelectedDate[0].pattern("yyyy-MM-dd");
        // let stopDate = this.valueSelectedDate[1].pattern("yyyy-MM-dd");
        // console.log(startDate);
        // console.log(stopDate);
      }

      console.log(this.$refs["selectedStation"].value);
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
      let _jingGuo_stationName = this.$refs["selectedStation"].value;
      let _selectedDate = "";
      let _stopDate = "";
      let _startTime = "";
      let _stopTime = "";
      // let _weekRange = this.checkedGroupZhou.join(",");
      let _isChengJi = this.valueChengJi;
      let _isLinKe = this.valueLinKe;
      let _trainStatus = this.checkedGroupTrainStatus.join(",");
      if (this.valueSelectedDate) {
        _selectedDate = this.valueSelectedDate.pattern("yyyy-MM-dd");
      }

      // console.log(this.valueSelectedDate);
      // console.log(_isChengJi);

      this.$axios({
        method: "get",
        params: {
          TYPE: "getTableOneDayListData",
          selectedDate: _selectedDate,
          stopdate: _stopDate,
          starttime: _startTime,
          stoptime: _stopTime,
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
          // this.tableData3 = result;

          if (result == "-1") result = [];
          this.$refs["table1"].tableData3 = result;
          this.dataList = result;
          this.$refs["table1"].jingguoStation = _jingGuo_stationName;
          this.$refs["table1"].isChengJi = this.valueChengJi;
          this.$refs["table1"].trainStatus = this.checkedGroupTrainStatus;
          this.$refs["table1"].isLinKe = this.valueLinKe;
          // console.log();

          this.totalData = result;
          var arrX = [];
          var arrY = [];
          var arrY2 = [];
          var arrY3 = [];
          for (var i = 0; i < result.length; i++) {
            arrX[i] = result[i].TimeDuan;
            arrY[i] = result[i].averageSCTotal;
            arrY2[i] = result[i].averagePiaoeTotal;
            arrY3[i] = result[i].piaoELv2;
          }
          this.X_DATA = arrX;
          this.Y_RS_DATA = arrY;
          this.Y_PL_DATA = arrY2;
          this.Y_LYL_DATA = arrY3;

          this.drawLine();
        })
        .catch(resp => {
          console.log("请求失败()：" + resp + "," + resp.statusText);
          this.open5("请求失败,请检查网络！");
        });
    },

    getTotalData: function() {
      this.$axios({
        method: "get",
        params: { TYPE: "getTableOneDayListData" },
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
            arrX[i] = result[i].TimeDuan;
            arrY[i] = result[i].averageSCTotal;
            arrY2[i] = result[i].averagePiaoeTotal;
            arrY3[i] = result[i].piaoELv2;
          }
          this.X_DATA = arrX;
          this.Y_RS_DATA = arrY;
          this.Y_PL_DATA = arrY2;
          this.Y_LYL_DATA = arrY3;

          //console.log(this.X_DATA);
          //   console.log(this.Y_RS_DATA);

          this.drawLine();
        })
        .catch(resp => {
          console.log("请求失败()：" + resp.status + "," + resp.statusText);
          this.open5("请求失败,请检查网络！");
        });
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "分时段票额数据分析" },
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
            name: "发送人数",
            type: "bar",
            smooth: false,
            data: this.Y_RS_DATA //[5, 20, 36, 10, 10, 20]
          },
          {
            name: "额定人数",
            type: "bar",
            smooth: false,
            data: this.Y_PL_DATA //[5, 20, 36, 10, 10, 20]
          },
          {
            name: "利用率",
            type: "line",
            smooth: false,
            yAxisIndex: 1,
            // itemStyle: { color:'' },
            data: this.Y_LYL_DATA //[5, 20, 36, 10, 10, 20]
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
  min-width: 1200px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-col {
  margin-top: 10px;
  margin-bottom: 10px;
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

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
