
<template>
  <el-table
    :data="tableData3"
    height="500px"
    border
    @sort-change="sort_change"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
  >
    <el-table-column type="index" width="60" label="序号"></el-table-column>
    <el-table-column prop="dates" label="日期" width="140"></el-table-column>
    <el-table-column prop="TrainName" label="车次" width="90"></el-table-column>
    <el-table-column prop="onstation" label="上车站"></el-table-column>

    <el-table-column prop="runInterval" label="运行区间"></el-table-column>
    <el-table-column prop="belongBureau" label="担当局"></el-table-column>
    <!-- <el-table-column label="开行方向" sortable></el-table-column> -->
    <el-table-column prop="arriveTime" label="到点"></el-table-column>
    <el-table-column prop="leaveTime" label="发点"></el-table-column>
    <el-table-column prop="averageSC" label="上车人数"></el-table-column>
    <el-table-column prop="averageXC" label="下车人数"></el-table-column>
    <el-table-column prop="averagePiaoe" label="票额"></el-table-column>
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
      tableData3: [
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        },
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        },
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        },
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        },
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        },
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        },
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        },
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        },
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        },
        {
          dates: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0"
        }
      ]
    };
  },
  methods: {
    my_desc_sort(a, b) {
      // let Num1 = parseFloat(a.Send_Number);
      // let Num2 = parseFloat(b.Send_Number);
      let Num1 = a.Send_Number;
      let Num2 = b.Send_Number;
      // return Num1 - Num2;
      if (Num1 > Num2) {
        // console.log("开始排序.." + Num1 + "--" + Num2);
        return -1;
      } else if (Num2 < Num2) {
        // console.log("开始排序.....");
        return 1;
      } else {
        return 0;
      }
    },
    my_asc_sort(a, b) {
      // ... ...
    },
    sort_change(column) {
      console.log(column.order);
      if (column.prop === "Send_Number") {
        if (column.order === "descending") {
          console.log("倒序");

          this.tableData3 = this.tableData3.sort((a, b) => {
            return b.Send_Number - a.Send_Number;
          });
        } else if (column.order === "ascending") {
          console.log("正序");
          this.tableData3 = this.tableData3.sort((a, b) => {
            return a.Send_Number - b.Send_Number;
          });
        }
      } else if (column.prop === "averagePiaoe") {
        // ... ...averagePiaoe
        if (column.order === "descending") {
          console.log("倒序");

          this.tableData3 = this.tableData3.sort((a, b) => {
            return b.averagePiaoe - a.averagePiaoe;
          });
        } else if (column.order === "ascending") {
          console.log("正序");
          this.tableData3 = this.tableData3.sort((a, b) => {
            return a.averagePiaoe - b.averagePiaoe;
          });
        }
      }
    },

    getSummaries2(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 人";
        } else {
          sums[index] = "--";
        }
      });

      return sums;
    }
  }
};
</script>




