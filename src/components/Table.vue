
<template>
  <el-table
    :data="tableData3"
    height="350"
    border
    @sort-change="sort_change"
    show-summary
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
  >
    <el-table-column type="index" width="60" label="序号"></el-table-column>
    <el-table-column prop="date" label="日期" sortable width="140"></el-table-column>
    <el-table-column prop="TrainName" label="车次" width="90"></el-table-column>
    <el-table-column prop="isLinKe" label="临客" sortable></el-table-column>
    <el-table-column prop="TrainStatus" label="列车类型" sortable></el-table-column>
    <el-table-column prop="onstation" label="上车站"></el-table-column>
    <el-table-column prop="JingGuoStations" label="经过站"></el-table-column>
    <el-table-column prop="runInterval" label="运行区间"></el-table-column>
    <el-table-column prop="belongBureau" label="担当局"></el-table-column>
    <!-- <el-table-column label="开行方向" sortable></el-table-column> -->
    <el-table-column prop="arriveTime2" label="到点" sortable></el-table-column>
    <el-table-column prop="leaveTime" label="发点" sortable></el-table-column>
    <el-table-column prop="Send_Number" label="上车人数" sortable></el-table-column>
    <el-table-column prop="averagePiaoe" label="票额" sortable></el-table-column>
    <el-table-column prop="piaoELv" sortable label="利用率">
      <!-- <template slot-scope="scope">{{scope.row.piaoELv2}}%</template> -->
    </el-table-column>
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
      testTable: [
        {
          date: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "1",
          averageXC: "0",
          Send_Number: "1",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "12",
          averageXC: "0",
          Send_Number: "12",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "2",
          averageXC: "0",
          Send_Number: "2",
          piaoELv: "--"
        }
      ],
      tableData3: [
        {
          date: "yyyy-MM-dd",
          TrainName: "--",
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
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
          TrainStatus: "--",
          onstation: "--",
          Send_Station: "--",
          JingGuoStations: "--",
          runInterval: "--",
          belongBureau: "--",
          arriveTime2: "HH:mm",
          leaveTime: "HH:mm",
          averagePiaoe: "0",
          averageSC: "0",
          averageXC: "0",
          Send_Number: "0",
          piaoELv: "--"
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


