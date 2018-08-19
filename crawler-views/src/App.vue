<template>
  <div id="app">
    <img v-show="bgFlag" :src="kvBg" class="kvbg">
    <iframe v-if="!bgFlag" class="baniframe" sandbox="allow-scripts allow-same-origin" id="mh" :src="iframeBG"></iframe>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        选项
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="/">首页</el-dropdown-item>
        <el-dropdown-item command="bg">切换背景</el-dropdown-item>
        <el-dropdown-item command='news'>攻略列表</el-dropdown-item>
        <el-dropdown-item command='heroList'>英雄列表</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="banx">
      <transition name="el-fade-in-linear">
        <router-view/>
      </transition>
    </div>

  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      bgFlag: true,
      iframeBG: "",
      kvBg: ""
    };
  },
  methods: {
    getKvBg() {
      //获取王者荣耀官网背景图
      this.$axios.get("/kvBg").then(res => {
        if (res.data == null) {
          this.bgFlag = false;
          this.getJq22Bg();
          return;
        }
        this.bgFlag = true;
        this.kvBg = res.data;
      });
    },
    getJq22Bg() {
      this.$axios.get("/jq22Bg").then(res => {
        this.iframeBG = res.data;
      });
    },
    handleCommand(command) {
      if (command == "bg") {
        if (this.bgFlag) {
          this.getJq22Bg();
        }
        if (this.kvBg) {
          this.bgFlag = !this.bgFlag;
        } else {
          this.getJq22Bg();
        }
        return;
      }

      this.$router.push(command);
    }
  },
  created() {
    this.getJq22Bg();
    this.getKvBg();
  }
};
</script>

<style lang='less'>
#app {
  .banx {
    position: relative;
    overflow: hidden;
    width: 888px;
    margin: 0 auto;
    padding-bottom: 30px;
  }
  .kvbg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }

  .baniframe {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 0;
  }

  .el-dropdown-link {
    color: #409eff;
    display: inline-block;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 50%;
    line-height: 50px;
    z-index: 500;
    position: fixed;
    top: 30px;
    left: 30px;
    user-select: none;
    cursor: pointer;
    background: #fff;
  }
}
.el-dropdown-menu {
  top: 80px !important;
  left: 25px !important;
  position: fixed !important;
}
</style>
