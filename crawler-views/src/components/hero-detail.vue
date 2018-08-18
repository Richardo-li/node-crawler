<template>
  <div class="heroDetail">

    <div class="centerBox">

      <swiper :options="swiperOption" class="swiperBox" ref="mySwiper" v-if="JSON.stringify(ListData)!=='{}'">
        <swiper-slide v-for="(item,i) in ListData.heroBgData" :key="i" class="slide swiper-no-swiping" data-swiper-autoplay="1000">
          <!-- 加上类名swiper-no-swiping不允许用户鼠标拖动轮播图 -->
          <img :src="item.bigBG" alt="" class="slideBg">
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>

      <div class="smallImgBox">
        <span v-for="(item,i) in ListData.heroBgData" :key="i" :class="i==current?'curr':''" @click="changeCurr(i)">
          <img :src="item.smallImg" alt="">
        </span>
      </div>

    </div>

    <i class="el-icon-circle-close-outline closeBtn" @click.self="closeChild"></i>

  </div>
</template>

<script>

import 'swiper/dist/css/swiper.css';

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'detail',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    heroId: {
      type: String,
      default: '510',
    }
  },
  data() {
    return {
      ListData: {},
      current: 0,
      swiperOption: {
        loop: true, //循环播放
        speed: 1688,  //过渡时间
        autoplay: true,  //自动播放
        effect: 'fade', //渐变切换效果
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      }
    }
  },
  methods: {
    callback() {

      console.log(555);

    },
    changeCurr(index) {
      this.current=index;
      this.$refs.mySwiper.swiper.slideTo(index + 1, 1000, true);
      this.swiperOption.autoplay = true;
    },
    getDetail() {
      this.$axios.post('/heroDetail', this.heroId).then(res => {
        console.log(res.data);
        this.ListData = res.data;
      })
    },
    closeChild() {
      this.$emit('childInfo', false);
    }
  },
  mounted() {
  },
  watch: {
    heroId() {
      if (this.heroId == '') {
        return;
      }
      this.getDetail();
    }
  }
}
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
    background: #fff;
    .swiperBox {
      height: 100%;
      width: 100%;
      position: absolute;
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
        border: 3px solid #fffff2;
        border-radius: 2px 10px 2px 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 2px 10px 2px 10px;
        }
      }
    }
    .slide {
      user-select: none;
      .slideBg {
        height: 100%;
        width: 100%;
      }
    }
  }

  .curr {
    border-color: #1c8fea !important;
  }
}
</style>