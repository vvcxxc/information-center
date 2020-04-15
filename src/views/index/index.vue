<template>
  <div class="article-list-page">
    <div class="article-loading" v-if="isLoading">
      <div class="article-loading-box">
        <van-loading size="100px" color="#1989fa" />
      </div>
    </div>
    <div class="banner-img" v-if="bannerImages.length">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
          <img v-lazy="image" class="banner-img-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="article-tab-title-box">
      <div class="article-tab-title-content">
        <div
          v-for="(item,index) in articleTab"
          v-bind:key="index"
          :class="tabIndex==index?'table-item-select':'table-item'"
          @click="changeTabIndex(index)"
        >
          <span class="tab-link">{{item.category_name}}</span>
          <span class="tab-link-border" v-if="tabIndex==index"></span>
        </div>
      </div>
    </div>

    <div class="article-list-box">
      <div class="article-list-content">
        <div
          class="article-list-item"
          v-for="(item,index) in showList"
          v-bind:key="index"
          @click="goToArticle(item.id)"
        >
          <div class="article-list-item-title">{{item.article_title}}</div>
          <div class="article-list-item-time">{{item.publish_time}}</div>
        </div>
        <div
          class="other-article-more"
          v-if="pageList[tabIndex]<=totalPageList[tabIndex]"
          @click="getList(tabIndex, pageList[tabIndex])"
        >查看更多</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload, Loading, Notify } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Loading);
Vue.use(Notify);
import { getBannerImg, getArticleClass, getArticleList } from "@/api/api";
export default {
  data() {
    return {
      isLoading: false,
      tabIndex: 0,
      bannerImages: [],
      articleTab: [],
      listData: [[], []],
      showList: [],
      pageList: [],
      totalPageList: []
    };
  },
  created() {
    let role_uusn = this.$route.query.role_uusn;
    this.isLoading = true;
    this.getBanner(role_uusn);
    this.getTabClass(role_uusn);
  },
  watch: {
    tabIndex(index) {
      if (this.pageList[index]) {
        this.showList = this.listData[index];
      } else {
        this.getList(index, 1); //tab下标index，页数1
      }
    }
  },
  methods: {
    getBanner(role_uusn) {
      //加载查询banner图,页面加载使用一次
      getBannerImg({ role_uusn })
        .then(res => {
          res.data.length && (this.bannerImages = res.data);
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
          Notify("请求banner失败");
        });
    },
    changeTabIndex(index) {
      //换tab
      this.tabIndex = index;
    },
    getTabClass(role_uusn) {
      //加载查询文章分类,页面加载使用一次
      getArticleClass({ role_uusn })
        .then(res => {
          if (res.data.length) {
            this.articleTab = res.data;
            this.getList(0, 1); //tab下标0，页数1
          }
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
          Notify("请求文章分类失败");
        });
    },
    getList(index, page) {
      //查列表
      this.isLoading = true;
      getArticleList({
        category_id: this.articleTab[index].id,
        page
      })
        .then(res => {
          setTimeout(() => {
            this.isLoading = false;
          }, 200);
          let tempList = this.listData;
          let tempPage = this.pageList;
          let temptotalPageList = this.totalPageList;
          tempList[index] = tempList[index].length
            ? tempList[index].concat(res.data)
            : res.data;
          tempPage[index] = Number(page) + 1;
          temptotalPageList[index] = res.meta.pagination.total_pages;
          this.showList = tempList[index]; //临时一维数组，用于显示
          this.listData = tempList; //二维数组，用于储存
          this.pageList = tempPage; //页数数组
          this.totalPageList = temptotalPageList; //页面总数数组
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
          Notify("请求文章列表失败");
        });
    },
    goToArticle(id) {
      let role_uusn = this.$route.query.role_uusn;
      this.$router.push({
        path: "/article",
        query: { id, role_uusn }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>