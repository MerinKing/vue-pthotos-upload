<template>
  <div>
    <el-container>
      <el-header>
        <span>郑州东站票额数据导入管理</span>
      </el-header>

      <el-tabs type="card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 数据导入
          </span>
          <el-row style="height:100%;">
            <el-col :span="9"></el-col>
            <el-col :span="6">
              <el-upload
                class="upload-demo"
                ref="upload"
                :multiple="true"
                accept=".xls, .xlsx"
                :action="getUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-success="successDeal"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  type="success"
                  @click="submitUpload"
                >导入数据库</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件。支持批量上传。</div>
              </el-upload>
              <el-col :span="9"></el-col>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="数据查看">
          <el-row>
            <el-col :span="24">
              <span>日期:</span>
              <el-date-picker v-model="valueDate" type="date" placeholder="选择日期"></el-date-picker>

              <el-button @click="btnQueryClick()" type="primary">查询</el-button>
            </el-col>
            <el-col :span="24">
              <table1 ref="table1"></table1>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
</template>

<script>
import table1 from "./dataManagerTable";
import { Loading } from "element-ui";
export default {
  components: { table1 },
  data() {
    return {
      getUrl: config.upLoadFileURL,
      valueDate: new Date("2019-04-03"),
      fileList: [
        // {
        //   name: "20190728.xls",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "20190729.xls",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ]
    };
  },
  mounted() {
    this.LoadingData();
  },
  methods: {
    btnQueryClick: function() {
      this.LoadingData();
    },
    LoadingData: function() {
      let _selectDate = this.valueDate.pattern("yyyy-MM-dd");
      // console.log(_selectDate);
      let loadingInstance1 = Loading.service({ fullscreen: true });
      this.$axios({
        method: "get",
        params: {
          TYPE: "getUpLoadData",
          selectDate: _selectDate
        },
        url: config.getTableData
      })
        .then(resp => {
          var result = resp.data;
          // console.log(result);
          // this.tableData3 = result;

          if (result == "-1") {
            result = [];
          }
          this.$refs["table1"].tableData3 = result;

          loadingInstance1.close();
        })
        .catch(resp => {
          loadingInstance1.close();
          console.log("请求失败()：" + resp + "," + respText);
          this.open5("请求失败,请检查网络！");
        });
    },
    open5(_content) {
      this.$notify.info({
        title: "消息",
        message: _content
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    openSuccessShow(Msg) {
      this.$message({
        message: Msg,
        type: "success"
      });
    },
    successDeal(response, file, fileList) {
      console.log(response);
      //console.log(file);
      // console.log(fileList);

      if (response == "success") {
        let Msg = file.name + "上传成功！";
        this.openSuccessShow(Msg);
      } else {
        let Msg = file.name + "上传失败！";
        this.$message.error(Msg);
        // this.fileList = [];
      }
    }
  }
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