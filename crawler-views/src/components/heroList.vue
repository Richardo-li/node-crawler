<template>
  <div class="heroList">



  </div>
</template>

<script>
export default {
  name: "heroList",
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
    getHeroListData() {
      this.$axios.get("/heroList").then(res => {
        console.log(666);
        console.log(res);
      });
    },

  },
  created() {
    this.getHeroListData();
  }
};
</script>
<style scoped lang='less'>
.heroList {
}
</style>
