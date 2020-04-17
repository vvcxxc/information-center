<template>
  <div class="notFound">
    <div class="notFoundContent">
      <img
        class="notFoundImg"
        src="http://oss.tdianyi.com/front/7c4xsNtkd6MmdbysKdazHAxE8i8siWCm.png"
      />
      <div class="notFoundInfo">大人，您要找的页面离家出走了，</div>
      <div class="notFoundInfo">小的正在努力寻找中！</div>
      <div class="notFoundBtn" @click="goBack">返回</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    msg: String
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notFound {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background: #fff;
}
.notFoundContent {
  width: 450px;
  height: 700px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.notFoundImg {
  width: 377px;
  height: 377px;
  margin-bottom: 40px;
}
.notFoundInfo {
  width: 100%;
  height: 45px;
  text-align: center;
  font-size: 28px;
  color: rgba(51, 51, 51, 1);
  line-height: 1;
  font-weight: bold;
}
.notFoundBtn {
  margin-top: 20px;
  width: 200px;
  height: 72px;
  background: rgba(39, 156, 249, 1);
  border-radius: 10px;
  font-size: 27px;
  color: rgba(255, 255, 255, 1);
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
