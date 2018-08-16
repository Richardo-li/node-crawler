<template>
  <div class="heroList">
    <!-- 英雄列表 -->
    <title-comp>
      <slot>英雄列表</slot>
    </title-comp>
    <ul class="heroBox">
      <li v-for="(item,i) in listData" :key="i">
        <img :src="item.heroImg" alt="" class="heroImg">
        <span class="heroName">{{item.heroName}}</span>
      </li>
    </ul>

  </div>
</template>

<script>

import titleComp from "@/components/title-comp.vue";

export default {
  name: "heroList",
  components:{
    titleComp
  },
  data() {
    return {
      listData: []
    };
  },
  methods: {
    getHeroListData() {
      this.$axios.get("/heroList").then(res => {
        this.listData = res.data;
      });
    }
  },
  created() {
    this.getHeroListData();
  }
};
</script>
<style scoped lang='less'>
.heroList {
  .heroBox {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    li {
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
      user-select: none;
      margin: 10px;
      width: 87px;
      height: 100px;
      .heroImg {
        width: 100%;
        border: 3px solid #258df2;
        border-radius: 10px 0 10px 0;
      }
      .heroName {
        display: inline-block;
        font-weight: 600;
        font-size: 14px;
        padding-top: 3px;
        background-image: -webkit-linear-gradient(
          left,
          #dbdbdb,
          #000000 25%,
          #dbdbdb 50%,
          #000000 75%,
          #dbdbdb
        );
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
        -webkit-animation: text-animation 5s infinite linear;
      }
    }
  }
  @-webkit-keyframes text-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
}
</style>
