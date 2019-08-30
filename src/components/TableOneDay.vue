
<template>
  <div>
    <el-table
      :data="tableData3"
      :default-sort="{prop: 'TimeDuan', order: 'ascending'}"
      height="350"
      border
      @sort-change="sort_change"
      show-summary
      style="width: 100%"
      @row-dblclick="opeDetailDesc"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="date" sortable label="日期" width="180"></el-table-column>
      <el-table-column prop="TimeDuan" sortable label="时间段" width="180"></el-table-column>
      <el-table-column prop="averageSCTotal" label="上车人数"></el-table-column>
      <el-table-column prop="averagePiaoeTotal" label="票额"></el-table-column>
      <el-table-column prop="piaoELv" sortable label="利用率"></el-table-column>
      <el-table-column fixed="right" label="详情" width="100">
        <template slot-scope="scope">
          <el-button @click="opeDetailDesc(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详情查看" :visible.sync="dialogTableVisible" style="text-align:left;">
      <!-- <el-table :data="childDetailData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="trainName" label="车次" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>-->
      <childTable ref="child"></childTable>
    </el-dialog>
  </div>
</template>

<script>
import childTable from "./childDetailTable";
export default {
  components: { childTable },
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      childDetailData: [],
      tableData3: [
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        },
        {
          date: "yyyy-MM-dd",
          TimeDuan: "XXXX",
          averageSCTotal: "0",
          averagePiaoeTotal: "0",
          piaoELv: "--"
        }
      ],
      dialogTableVisible: false,
      jingguoStation: "",
      isChengJi: "",
      isLinKe: "",
      trainStatus: ""
    };
  },

  methods: {
    opeDetailDesc: function(row) {
      console.log(row.TimeDuan);
      let dates = row.date.split(" ")[0];
      let TimeArr = row.TimeDuan.split("~");
      console.log(dates);

      let startTime = TimeArr[0];
      let stopTime = TimeArr[1];
      if (this.$refs["child"]) {
        this.$refs["child"].loading = true;
      }
      //   console.log(this.$refs);
      this.LoadingChildTableData(dates, startTime, stopTime);
      this.dialogTableVisible = true;
    },

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
    },
    LoadingChildTableData: function(dates, starttime, stoptime) {
      this.$axios({
        method: "get",
        params: {
          TYPE: "getTableOneDayChildListData",
          selectedDate: dates,
          starttime: starttime,
          stoptime: stoptime,
          isChengJi: this.isChengJi,
          trainStatus: this.trainStatus.join(","),
          isLinKe: this.isLinKe,
          jingGuoStation: this.jingguoStation
        },
        url: config.getTableData
      })
        .then(resp => {
          var result = resp.data;
          if (result == "-1") result = [];
          this.$refs["child"].tableData3 = result;
          this.$refs["child"].loading = false;
          // console.log();
        })
        .catch(resp => {
          console.log("请求失败()：" + resp.status + "," + resp.statusText);
          // this.open5("请求失败,请检查网络！");
        });
    }
  }
};
</script>



