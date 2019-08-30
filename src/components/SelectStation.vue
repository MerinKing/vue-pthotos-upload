
<template>
  <el-select v-model="value" :clearable="true" filterable placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "许昌东"
        },
        {
          value: "选项2",
          label: "信阳"
        },
        {
          value: "选项3",
          label: "漯河西"
        },
        {
          value: "选项4",
          label: "安阳"
        },
        {
          value: "选项5",
          label: "开封"
        }
      ],
      value: ""
    };
  },
  mounted() {
    this.getStationData();
  },
  methods: {
    getStationData: function() {
      this.$axios({
        method: "get",
        params: { TYPE: "getStationData" },
        url: config.getTableData
      })
        .then(resp => {
          var result = resp.data;
          this.options = result;
        })
        .catch(resp => {
          console.log("请求失败()：" + resp + "," + resp.statusText);
          // this.open5("请求失败,请检查网络！");
        });
    }
  }
};
</script>

