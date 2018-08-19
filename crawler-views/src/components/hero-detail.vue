<template>
  <div class="heroDetail" v-if="JSON.stringify(ListData)!=='{}'">

    <div class="centerBox">

      <swiper :options="swiperOption" class="swiperBox" ref="mySwiper">
        <swiper-slide v-for="(item,i) in ListData.heroBgData" :key="i" class="slide swiper-no-swiping" data-swiper-autoplay="3000">
          <!-- 加上类名swiper-no-swiping不允许用户鼠标拖动轮播图 -->
          <img :src="item.bigBG" alt="" class="slideBg">
          <span class="nickName">{{item.nickName}}</span>
        </swiper-slide>
      </swiper>

      <div class="smallImgBox">
        <span v-for="(item,i) in ListData.heroBgData" :key="i" :class="i==current?'curr':''" @click="changeCurr(i)">
          <img :src="item.smallImg" alt="">
        </span>
      </div>

      <div class="heroInfo">
        <div :class="['herodetail-sort',ListData.classify.class]" :style="{backgroundImage:'url(' +ListData.classify.img+ ')'}"></div>
        <div class="heroName">{{ListData.heroName}}</div>
        <div class="skill">
          <div v-for="(item,i) in ListData.data" :key="i">
            <div class="skillTitle">{{item.title}}:</div>
            <div class="skillPercent">
              <el-progress :show-text='false' :percentage="Number(item.percent)" v-if="i==0" color="#1c8fea"></el-progress>
              <el-progress :show-text='false' :percentage="Number(item.percent)" v-if="i==1" color="#e7ca63"></el-progress>
              <el-progress :show-text='false' :percentage="Number(item.percent)" v-if="i==2" color="#5dd473"></el-progress>
              <el-progress :show-text='false' :percentage="Number(item.percent)" v-if="i==3" color="#e84a33"></el-progress>
            </div>
          </div>
        </div>
        <div class="history">
          英雄故事
        </div>
        <div class="heroHistory">
          <p v-html="ListData.heroHistory">

          </p>
        </div>
      </div>

    </div>

    <i class="el-icon-circle-close-outline closeBtn" @click.self="closeChild"></i>

  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "detail",
  components: {
    swiper,
    swiperSlide
  },
  props: {
    heroId: {
      type: String,
      default: "510"
    }
  },
  data() {
    var vm = this;
    return {
      ListData: {},
      current: 0,
      swiperOption: {
        loop: true, //循环播放
        speed: 888, //过渡时间
        autoplay: true, //自动播放
        effect: "fade", //渐变切换效果
        on: {
          transitionStart() {
            //过渡效果开始时触发
            vm.current = this.realIndex;
          }
        }
      }
    };
  },
  methods: {
    changeCurr(index) {
      this.current = index;
      this.$refs.mySwiper.swiper.slideTo(index + 1, 1000, true);
    },
    getDetail() {
      this.current = 0;
      this.ListData = {};
      this.$axios.post("/heroDetail", this.heroId).then(res => {
        console.log(res.data);
        this.ListData = res.data;
      });
    },
    closeChild() {
      this.$emit("childInfo", false);
    }
  },
  mounted() {},
  watch: {
    heroId() {
      if (this.heroId == "") {
        return;
      }
      this.getDetail();
    }
  }
};
</script>

<style scoped lang='less'>
.heroDetail {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 688;
  .closeBtn {
    color: #fff;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 50px;
    cursor: pointer;
  }
  .centerBox {
    position: absolute;
    width: 1200px;
    height: 550px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // background: #fff;
    .swiperBox {
      height: 100%;
      width: 100%;
      position: absolute;
    }
    .slide {
      user-select: none;
      .slideBg {
        height: 100%;
        width: 100%;
      }
      .nickName {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 28px;
        color: #fdbd33;
      }
    }
    .smallImgBox {
      position: absolute;
      z-index: 9999;
      bottom: 10px;
      right: 10px;
      span {
        cursor: pointer;
        user-select: none;
        display: inline-block;
        width: 70px;
        height: 70px;
        margin: 3px;
        box-sizing: border-box;
        border: 5px solid #dddddd;
        border-radius: 1px 10px 1px 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 2px 10px 2px 10px;
        }
      }
    }
    .heroInfo {
      padding: 10px;
      width: 290px;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9999;
      .heroName {
        color: #fff;
        font-size: 48px;
        padding: 22px;
      }
      .skill {
        padding: 16px 20px;
        > div {
          clear: both;
        }
        .skillTitle {
          float: left;
          width: 30%;
          color: #fff;
          font-size: 16px;
          height: 30px;
          line-height: 30px;
        }
        .skillPercent {
          float: left;
          height: 30px;
          width: 70%;
          position: relative;
          padding-top: 13px;
        }
      }
      .history {
        clear: both;
        color: #fff;
        font-size: 18px;
        padding: 12px;
      }
      .heroHistory {
        clear: both;
        color: #fff;
        padding: 0 0 0 12px;
        height: 190px;
        overflow-y: auto;
        > p {
          line-height: 22px;
          text-indent: 2em;
        }
      }
    }
  }

  // 修改滚动条样式
  .heroHistory::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  /*正常情况下滑块的样式*/
  .heroHistory::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
  /*鼠标悬浮在该类指向的控件上时滑块的样式*/
  .heroHistory:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
  /*鼠标悬浮在滑块上时滑块的样式*/
  .heroHistory::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
  /*正常时候的主干部分*/
  .heroHistory::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: white;
  }
  /*鼠标悬浮在滚动条上的主干部分*/
  .heroHistory::-webkit-scrollbar-track:hover {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.01);
  }

  .herodetail-sort {
    background-repeat: no-repeat;
    display: block;
    width: 100%;
    height: 67px;
    overflow: hidden;
    text-indent: -9999em;
  }

  .herodetail-sort-1 {
    //战士
    background-position: 0 -140px;
  }

  .herodetail-sort-2 {
    //法师
    background-position: 0 -70px;
  }

  .herodetail-sort-3 {
    //坦克
    background-position: 0 0;
  }

  .herodetail-sort-4 {
    //刺客
    background-position: 0 -280px;
  }

  .herodetail-sort-5 {
    //射手
    background-position: 0 -350px;
  }

  .herodetail-sort-6 {
    //辅助
    background-position: 0 -210px;
  }

  .curr {
    border-color: #0890ff !important;
  }
}
</style>