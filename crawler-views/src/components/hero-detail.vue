<template>
  <div class="heroDetail" @click.self="closeChild">

    <div class="detailMain">

    </div>

  </div>
</template>

<script>
export default {
  name: 'detail',
  props: {
    heroId: {
      type: String,
      default: '510',
    }
  },
  data() {
    return {
      ListData: {},
      // cHeight: document.documentElement.clientHeight - 120 + 'px',
    }
  },
  methods: {
    getDetail() {
      this.$axios.post('/heroDetail', this.heroId).then(res => {
        this.ListData = res.data;
      })
    },
    test() {
      this.$message.success('6666');
    },
    closeChild() {
      this.$emit('childInfo', false);
    }
  },
  created() {
    // console.log(this.cHeight);
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 688;

  .detailMain {
  }
}
</style>