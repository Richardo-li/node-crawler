<template>
  <div class="titleComp">
    <div class="myTitle">
      <span>
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "titleComp",
  data() {
    return {};
  }
};
</script>
<style scoped lang='less'>
.titleComp {
  .myTitle {
    width: 100%;
    text-align: center;
    display: inline-block;
    font-weight: 600;
    font-size: 28px;
    padding: 16px;
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
    -webkit-animation: title-animation 5s infinite linear;
  }
  @-webkit-keyframes title-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
}
</style>
