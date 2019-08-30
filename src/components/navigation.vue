<template>
  <div>
    <div class="box">
      <router-link to="/mainPage1">按日期统计</router-link>
      <i class="iconfont icontongji6"></i>
    </div>
    <div class="box">
      <router-link to="/mainPage2">分时段统计</router-link>
      <i class="iconfont icontongji4"></i>
    </div>
    <div class="box">
      <router-link to="/mainPage3">按去向站统计</router-link>
      <i class="iconfont icontongji"></i>
    </div>
    <div class="box">
      <router-link to="/mainPage4">数据管理</router-link>
      <i class="iconfont iconshujuguanli"></i>
    </div>
  </div>
</template>
<style scoped>
div.box {
  float: left;
  display: block;
  width: 300px;
  height: 200px;
  background-color: rgba(6, 132, 250, 0.726);
  margin: 20px;
  border-radius: 10px;
  text-decoration: none;
  position: relative;
}
div.box:hover {
  background-color: rgb(116, 212, 204);
}
div.box a {
  display: block;
  width: 300px;
  height: 200px;
  color: white;
  line-height: 250px;
  text-decoration: none;
  position: absolute;
  z-index: 1000;
}
.iconfont {
  display: block;
  font-size: 50px;
  position: absolute;
  left: 125px;
  top: 50px;
  z-index: 1;
}
</style>
