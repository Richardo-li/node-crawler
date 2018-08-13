<template>
  <div id="app">
    <img :src="kvBg" class="kvbg">

    <!-- <iframe class="baniframe" sandbox="allow-scripts allow-same-origin" id="mh" :src="iframeSrc"></iframe> -->

    <div class="banx">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      kvBg: ""
    };
  },
  computed: {
    iframeSrc() {
      let x = parseInt(Math.random() * (15 - 1 + 1) + 1);
      return `http://www.jq22.com/js/a${x}.html`;
    }
  },
  methods: {
    //获取背景图
    getKvBg() {
      this.$axios.get("/kvBg").then(res => {
        this.kvBg = res.data;
      });
    },
  },
  created() {},
  mounted() {
    this.getKvBg();
  }
};
</script>

<style scoped lang='less'>
#app {
  .banx {
    position: relative;
    overflow: hidden;
    width: 888px;
    margin: 0 auto;
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
}
</style>
