
<template>
  <el-table
    v-loading="loading"
    :data="tableData3"
    height="350"
    border
    style="width: 100%"
    :default-sort="{prop: 'leaveTime', order: 'ascending'}"
  >
    <el-table-column type="index" width="60" label="序号"></el-table-column>
    <el-table-column prop="TrainName" label="车次"></el-table-column>
    <el-table-column prop="isLinKe" label="临客" sortable></el-table-column>
    <!-- <el-table-column prop="onstation" label="上车站"></el-table-column> -->
    <el-table-column prop="Send_Station" label="经过站"></el-table-column>
    <el-table-column prop="runInterval" label="运行区间"></el-table-column>
    <!-- <el-table-column prop="belongBureau" label="担当局"></el-table-column> -->
    <el-table-column prop="arriveTime" label="到点"></el-table-column>
    <el-table-column prop="leaveTime" label="发点" sortable></el-table-column>
    <el-table-column prop="Send_Number" label="上车人数"></el-table-column>
    <el-table-column prop="averagePiaoe" label="日票额"></el-table-column>
    <el-table-column prop="piaoELv" sortable label="利用率"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      loading: true,
      tableData3: [
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
      ]
    };
  }
};
</script>


