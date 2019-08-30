<template>
  <div class="block">
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="false">正序</el-radio>
        <el-radio :label="true">倒序</el-radio>
      </el-radio-group>
      <el-button
        style="position: absolute;right: 50px;top: 70px;"
        type="primary"
        icon="el-icon-refresh-right"
        circle
        size="mini"
        @click="loading"
      ></el-button>
    </div>
    <br />

    <el-timeline :reverse="reverse" style="height:300px;overflow-y:scroll;">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >{{activity.content}}</el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reverse: false,
      activities: [
        {
          content: "站台层 28站台 G1963 站台作业 ",
          timestamp: "2019-08-20 09:59"
        },
        {
          content: "站台层 28站台 G1963 站台作业 ",
          timestamp: "2019-08-20 10:29"
        },
        {
          content: "站台层 28站台 G1963 站台作业 ",
          timestamp: "2019-08-20 11:09"
        },
        {
          content: "站台层 28站台 G1963 站台作业 ",
          timestamp: "2019-08-20 12:59"
        },
        {
          content: "站台层 28站台 G1963 站台作业 ",
          timestamp: "2019-08-20 13:59"
        },
        {
          content: "站台层 28站台 G1963 站台作业 ",
          timestamp: "2019-08-20 14:59"
        },
        {
          content: "站台层 28站台 G1963 站台作业 ",
          timestamp: "2019-08-20 15:59"
        },
        {
          content: "站台层 28站台 G1963 站台作业 ",
          timestamp: "2019-08-20 17:59"
        }
      ]
    };
  },
  props: {
    workerId: {
      type: String,
      required: true
    },
    selectedDate: {
      type: Date,
      required: true
    }
  },
  mounted() {
    this.loading();
  },
  methods: {
    loading: function() {
      let _selectedDate = this.selectedDate.pattern("yyyy-MM-dd");
      let _workerID = this.workerId;

      // console.log(this.selectedDate.pattern("yyyy-MM-dd"));
      this.$axios({
        method: "get",
        params: {
          TYPE: "LoadHistoryData",
          selectedDate: _selectedDate,
          WorkerID: _workerID
        },
        url: config.getTableData
      })
        .then(resp => {
          var result = resp.data;
          //   console.log(result);
          if (result == "-1") result = [];

          this.activities = result;
        })
        .catch(resp => {
          console.log("请求失败(CellMsg)：" + resp + "," + resp.Text);
        });
    }
  }
};
</script>