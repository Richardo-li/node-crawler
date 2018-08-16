<template>
  <div class="news">
    <!-- 攻略列表 -->
    <title-comp>
      <slot>攻略列表</slot>
    </title-comp>
    <div class="news">
      <a :href="item.href" v-for="(item,i) in listData" :key="i" target="_blank">
        <span>
          <img :src="item.imgSrc" alt="" class="newsImg">
          <span class="tit">{{item.title}}</span>
          <span class="cte">{{item.content}}</span>
          <span class="look">阅读全文</span>
        </span>
      </a>
    </div>

    <div class="block">
      <el-pagination :background='true' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pager.currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="pager.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import titleComp from "@/components/title-comp.vue";

export default {
  name: "news",
  components: {
    titleComp
  },
  data() {
    return {
      currentDate: new Date(),
      listData: [],
      pager: {
        total: 0,
        currentPage: 1
      }
    };
  },
  methods: {
    getData(i) {
      this.$axios.post("/newsList", i).then(res => {
        this.listData = res.data.data;
        this.pager.total = Number(res.data.total);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getData(val);
    }
  },
  created() {
    this.getData(this.pager.currentPage);
  }
};
</script>
<style scoped lang='less'>
.news {
  .littleBox {
    ul {
      a {
        display: inline-block;
        margin: 8px;
        height: 93px;
        width: 93px;
        background: rgb(194, 186, 186);
        border-radius: 5px;
      }
    }
  }
  .listImg {
    width: 100%;
    height: 100%;
  }
  .news {
    a {
      display: block;
      margin: 18px;
      height: 170px;
      width: 100%;
      background: #ffffff;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 18px 40px;
      > span {
        display: block;
        position: relative;
        .tit {
          font-size: 20px;
          color: #000;
          position: absolute;
          top: 0px;
          left: 220px;
        }
        .cte {
          position: absolute;
          top: 35px;
          color: rgb(175, 175, 175);
          line-height: 19px;
          left: 220px;
        }
        .look {
          position: absolute;
          top: 107px;
          left: 220px;
          height: 30px;
          width: 90px;
          text-align: center;
          line-height: 30px;
          background: #d0ba88;
          color: #000;
        }
        .newsImg {
          width: 180px;
          height: 135px;
        }
      }
    }
  }
  .block {
    text-align: center;
    padding: 10px 0 30px 0;
  }
}
</style>
