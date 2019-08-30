<!--主界面设计  -->
<template>
  <div>
    <el-container>
      <el-header>
        <span>空闲作业人员查询</span>
      </el-header>
      <div>
        <br />

        <el-row>
          <el-col :span="4" style="min-width:300px;">
            <span>日期</span>
            <el-date-picker v-model="valueDate" type="date" placeholder="请选择"></el-date-picker>
          </el-col>
          <el-col :span="6" style="min-width:470px;">
            <span>时间范围:</span>
            <el-time-picker
              is-range
              format="HH:mm"
              v-model="value_TimePicker"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-col>
          <el-col :span="3">
            <el-button @click="btnQueryClick()" type="primary">查询</el-button>

            <!-- <export2excel style="height:40px;"></export2excel> -->
          </el-col>
        </el-row>
      </div>
      <div>
        <br />
        <!-- <table1 :tableData="tableData3" ref="table1"></table1> -->
      </div>
      <el-main>
        <div id="contain">
          <div v-if="isNoData">无数据</div>

          <transition-group name="el-zoom-in-center">
            <workerCell
              v-for=" item in freeWorkersData"
              :key="item.worker"
              :workerName="item.workerName"
              :workerID="item.worker"
              :groupName="item.GroupName"
              :workType="item.WorkName"
              :_dateTime="refreshChildComs"
              :selectedDate="valueDate"
              :selectedTimeRange="value_TimePicker"
            ></workerCell>
          </transition-group>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import table1 from "./Table";
import selectStation from "./SelectStation";
import { Loading } from "element-ui";
import export2excel from "./Export2Excel";
import workerCell from "./workerCell";
export default {
  name: "MainPage",
  components: { table1, workerCell, export2excel },
  data() {
    return {
      refreshChildComs: new Date(),
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
      // valueDate: [new Date().addDate(-5), new Date().addDate(-1)],
      valueDate: new Date("2019-08-21"),
      //value_TimePicker: [new Date(), new Date(2016, 9, 10, 9, 40)],
      value_TimePicker: [new Date(), new Date().addMinutes(30)],
      tableData3: [],
      freeWorkersData: []
    };
  },
  mounted() {
    this.LoadingData();
  },

  computed: {
    isNoData: function() {
      if (this.freeWorkersData.length > 0) return false;
      return true;
    },
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
      if (this.valueDate) {
        _startDate = this.valueDate[0].pattern("yyyy-MM-dd");
        _stopDate = this.valueDate[1].pattern("yyyy-MM-dd");
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
      //   console.log(this.valueDate);
      if (this.valueDate) {
        let startDate = this.valueDate.pattern("yyyy-MM-dd");
        //let stopDate = this.valueDate[1].pattern("yyyy-MM-dd");
      }
      if (this.value_TimePicker) {
        // console.log(this.value_TimePicker[0].pattern("HH:mm"));
      }

      this.LoadingData();
    },
    open5(_content) {
      this.$notify.info({
        title: "消息",
        message: _content
      });
    },

    LoadingData: function() {
      this.refreshChildComs = new Date();
      let _selectedDate = "";
      let _startTime = "";
      let _stopTime = "";

      //   let _trainStatus = this.checkedGroupTrainStatus.join(",");
      if (this.valueDate) {
        _selectedDate = this.valueDate.pattern("yyyy-MM-dd");
        // _stopDate = this.valueDate[1].pattern("yyyy-MM-dd");
      }
      if (this.value_TimePicker) {
        _startTime = this.value_TimePicker[0].pattern("HH:mm");
        _stopTime = this.value_TimePicker[1].pattern("HH:mm");
      }

      let loadingInstance1 = Loading.service({ fullscreen: true });
      this.$axios({
        method: "get",
        params: {
          TYPE: "LoadData",
          selectedDate: _selectedDate,
          starttime: _startTime,
          stoptime: _stopTime
        },
        url: config.getTableData
      })
        .then(resp => {
          var result = resp.data;
          //   console.log(result);
          // this.tableData3 = result;

          if (result == "-1") {
            result = [];
          }
          this.freeWorkersData = result;

          // this.$refs["table1"].tableData3 = result;
          // this.dataList = result;
          // console.log();
          loadingInstance1.close();
        })
        .catch(resp => {
          loadingInstance1.close();
          console.log("请求失败()：" + resp + "," + respText);
          this.open5("请求失败,请检查网络！");
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
Date.prototype.addMinutes = function(minutes) {
  this.setMinutes(this.getMinutes() + minutes);
  return this;
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
  /* text-align: center; */
  /* line-height: 160px; */
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
#contain {
  min-height: 400px;
}
</style>
