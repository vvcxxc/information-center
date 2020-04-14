<template>
  <div class="article-list-page">
    <div class="banner-img">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
          <!-- <img :src="image" class="banner-img-img" /> -->
          <img v-lazy="image" class="banner-img-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="article-tab-title-box">
      <div class="article-tab-title-content">
        <div :class="tabIndex==0?'table-item-select':'table-item'" @click="tabIndex=0">
          <span class="tab-link">首页</span>
          <span class="tab-link-border" v-if="tabIndex==0"></span>
        </div>
        <div :class="tabIndex==1?'table-item-select':'table-item'" @click="tabIndex=1">
          <span class="tab-link">时政</span>
          <span class="tab-link-border" v-if="tabIndex==1"></span>
        </div>
        <div :class="tabIndex==2?'table-item-select':'table-item'" @click="tabIndex=2">
          <span class="tab-link">思想理论</span>
          <span class="tab-link-border" v-if="tabIndex==2"></span>
        </div>
        <div :class="tabIndex==3?'table-item-select':'table-item'" @click="tabIndex=3">
          <span class="tab-link">党建经验</span>
          <span class="tab-link-border" v-if="tabIndex==3"></span>
        </div>
        <div :class="tabIndex==4?'table-item-select':'table-item'" @click="tabIndex=4">
          <span class="tab-link">最新动态</span>
          <span class="tab-link-border" v-if="tabIndex==4"></span>
        </div>
      </div>
    </div>

    <div class="article-list-box">
      <div class="article-list-content">
        <div class="article-list-item">
          <div class="article-list-item-title">某某店铺赚疯来！</div>
          <div class="article-list-item-time">2019-10-10 15:30:45</div>
        </div>
        <div class="article-list-item">
          <div class="article-list-item-title">某某店铺赚疯来某某店铺赚疯来！</div>
          <div class="article-list-item-time">2019-10-10 15:30:45</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
import { getBannerImg } from "@/api/api";

export default {
  data() {
    return {
      tabIndex: 0,
      bannerImages: [
        "http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/SjDsykGthz8epDB6dmeKWfx6fCtbm3ZX.png",
        "http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/aZsANKK6S7iXciGfnRS6NK8iXyjtcs3Q.png"
      ]
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      getBannerImg(1).then(res=>console.log(res))
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>