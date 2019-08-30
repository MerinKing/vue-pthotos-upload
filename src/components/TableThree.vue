
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
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column prop="Send_Station" label="去向车站" sortable width="120"></el-table-column>
    <el-table-column prop="GuanZhiStatus" label="是否管内" sortable width="120"></el-table-column>
    <el-table-column prop="Send_Number" label="去向人数" width="90"></el-table-column>
    <el-table-column prop="averagePiaoe" label="票额"></el-table-column>
    <el-table-column prop="piaoELv" sortable label="利用率"></el-table-column>
  </el-table>
</template>

<script>
import { METHODS } from "http";
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
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },

        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        },
        {
          Send_Station: "--",
          GuanZhiStatus: "--",
          Send_Number: "--",
          averagePiaoe: "--",
          runInterval: "--",
          piaoELv: "--"
        }
      ]
    };
  },
  methods: {
    sort_change(column) {
      console.log(column.order);
      if (column.prop === "piaoELv") {
        if (column.order === "descending") {
          console.log("倒序");

          this.tableData3 = this.tableData3.sort((a, b) => {
            return b.piaoELv2 - a.piaoELv2;
          });
        } else if (column.order === "ascending") {
          console.log("正序");
          this.tableData3 = this.tableData3.sort((a, b) => {
            return a.piaoELv2 - b.piaoELv2;
          });
        }
      }
    }
  }
};
</script>


