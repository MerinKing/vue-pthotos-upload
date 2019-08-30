<template>
  <div class="contain">
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="line-height:50px;">
        <el-avatar :size="50" fit="fill" :src="getWorkerPhotosUrl" @error="errorHandler">
          <img :src="noPthoto" title="未采集该人员的照片信息" />
        </el-avatar>
        <div class="nameSpan">{{workerName}}</div>

        <el-button @click="dialogVisible = true" style="float: right; padding: 3px 0" type="text">详情</el-button>
      </div>
      <!-- <div v-for="o in 0" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
      <div class="text item">
        作业人员ID：
        <span style="color:red">{{workerID}}</span>
      </div>
      <div class="text item">作业人员所属班组：{{groupName}}</div>
      <!-- <div class="text item">作业所在位置：{{workPosition}}</div> -->
      <div class="text item">作业类型：{{workType}}</div>
      <div class="text item">上次作业结束时间：{{lastEndTime}}</div>
      <div class="text item">下次作业开始时间：{{nextStartTime}}</div>
      <div class="text item">作业间隔时间：{{jiangeTime}} min</div>
    </el-card>

    <el-dialog title="作业查看" width="600px" style="height:600px;" :visible.sync="dialogVisible">
      <workHistory :workerId="workerID" :selectedDate="selectedDate"></workHistory>
    </el-dialog>
  </div>
</template>

<script>
let emptyImgUrl = require("../assets/images/empty.png");
import workHistory from "./workHistory";
export default {
  components: { workHistory },
  data() {
    return {
      noPthoto: emptyImgUrl,
      dialogVisible: false,
      lastEndTime: "",
      nextStartTime: "",
      jiangeTime: ""

      //   circleUrl: this.getWorkerPhotosUrl()
    };
  },
  props: {
    _dateTime: {
      type: Date,
      required: false,
      default: new Date()
    },
    selectedDate: {
      type: Date,
      required: false,
      default: new Date()
    },
    selectedTimeRange: {
      type: Array,
      required: false,
      default: []
    },
    workerID: {
      type: String,
      required: true,
      default: "001"
    },
    workerName: {
      type: String,
      required: true,
      default: "XXX"
    },
    groupName: {
      type: String,
      required: true,
      default: "二班"
    },
    workPosition: {
      type: String,
      required: false,
      default: "站台层"
    },
    workType: {
      type: String,
      required: true,
      default: "乘降作业"
    }
  },
  computed: {
    getWorkerPhotosUrl: function() {
      let tempUrl = emptyImgUrl;
      try {
        tempUrl = workerconfig[this.workerID];
      } catch (ee) {
        tempUrl = emptyImgUrl;
      }
      if (tempUrl === undefined) {
        tempUrl = emptyImgUrl;
      }
      // console.log(tempUrl);
      return tempUrl;
    }
  },
  mounted() {
    this.getTimeDesc();
  },
  watch: {
    _dateTime: function() {
      this.getTimeDesc();
      //console.log("获取到监控状态了...");
    }
  },
  methods: {
    errorHandler() {
      return true;
    },
    getTimeDesc: function() {
      let testDate = this.selectedDate.pattern("yyyy-MM-dd");
      //   console.log(testDate);
      let _WorkerID = "";
      this.$axios({
        method: "get",
        params: {
          TYPE: "LoadChildData",
          //   startdate: _startDate,
          WorkerID: _WorkerID
        },
        url: config.getTableData
      })
        .then(resp => {
          var result = resp.data;
          //   console.log(result);
          this.lastEndTime = result.lastEndTimeValue;
          this.nextStartTime = result.nextStartTimeValue;
          this.jiangeTime = result.IntervealTime;
        })
        .catch(resp => {
          console.log("请求失败(CellMsg)：" + resp + "," + resp.Text);
        });
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}
.nameSpan {
  position: absolute;
  top: 0px;
  left: 70px;
  width: 180px;
  font-weight: bolder;
  height: 50px;
  line-height: 50px;
}
.item {
  margin-bottom: 18px;
}
.clearfix {
  position: relative;
  height: 40px;
  line-height: 50px;
}
.contain {
  float: left;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 300px;
  margin: 10px;
}
.el-avatar >>> img {
  width: 100% !important;
}
</style>