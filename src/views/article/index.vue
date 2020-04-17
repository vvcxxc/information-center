<template>
  <div class="article-list-page">
    <NotFound v-if="notFound" />
    <div class="article-loading" v-if="isLoading">
      <div class="article-loading-box">
        <van-loading size="100px" color="#1989fa" />
      </div>
    </div>
    <div class="previewPhoneTitle">{{data.article_title}}</div>
    <div class="previewPhoneAuthBox">
      <div class="previewPhoneAuth">发布者：{{data.article_author}}</div>
      <div class="previewPhoneTime">发布时间：{{data.publish_time}}</div>
    </div>
    <div class="title-img">
      <img class="title-img-img" :src="data.author_cover" />
    </div>
    <div class="previewContent" v-html="data.content"></div>
    <div class="other-article">
      <div class="other-article-title">精品推荐</div>
      <div
        class="other-article-item"
        v-for="(item,index) in otherArticleList"
        v-bind:key="index"
        @click="goToArticle(item.id)"
      >
        <div class="other-article-item-img">
          <img class="other-article-item-img-img" :src="item.author_cover" />
        </div>
        <div class="other-article-item-info">
          <div class="other-article-item-info-title">{{item.article_title}}</div>
          <div class="other-article-item-info-date">{{item.publish_time}}</div>
        </div>
      </div>
      <div class="other-article-more" @click="goToIndex()">查看更多攻略</div>
    </div>
  </div>
</template>
<script>
import { getArticleInfo, getArticleOtherList } from "@/api/api";
import Vue from "vue";
import { Loading, Notify } from "vant";
Vue.use(Loading);
Vue.use(Notify);
import NotFound from "@/components/NotFound";
export default {
  data() {
    return {
      isLoading: false,
      data: {
        id: 0,
        article_title: "",
        article_author: "",
        author_cover: "",
        content: "",
        read_num: 0,
        publish_time: ""
      },
      otherArticleList: [],
      meta: {
        pagination: {
          total: 0,
          count: 0,
          per_page: 0,
          current_page: 0,
          total_pages: 0
        }
      },
      listPage: 1,
      notFound: false
    };
  },
  created() {
    let id = this.$route.query.id;
    this.isLoading = true;
    getArticleInfo({ article_id: id })
      .then(res => {
        this.isLoading = false;
        res.data && (this.data = res.data);
        this.getOtherList(1);
      })
      .catch(err => {
        this.isLoading = false;
        Notify(err.data.message);
        if (err.status == 404) {
          this.notFound = true;
        }
      });
  },
  methods: {
    getOtherList(page) {
      this.isLoading = true;
      getArticleOtherList({
        role_uusn: this.$route.query.role_uusn,
        exclude_article_id: this.data.id,
        page
      })
        .then(res => {
          setTimeout(() => {
            this.isLoading = false;
          }, 200);
          console.log(res);
          let tempList = this.otherArticleList.length
            ? this.otherArticleList.concat(res.data)
            : res.data;
          this.otherArticleList = tempList;
          this.meta = res.meta;
          this.listPage = Number(page) + 1;
        })
        .catch(err => {
          this.isLoading = false;
          Notify(err.data.message);
          if (err.status == 404) {
            this.notFound = true;
          }
        });
    },
    goToArticle(id) {
      //假跳转
      this.$router.push({
        query: { id, role_uusn: this.$route.query.role_uusn }
      }); //改url参数，假象，没啥别的作用
      this.isLoading = true;
      getArticleInfo({ article_id: id })
        .then(res => {
          this.isLoading = false;
          res.data && (this.data = res.data);
          this.otherArticleList = [];
          this.listPage = 1;
          this.getOtherList(1);
          window.scrollTo(0, 0);
        })
        .catch(err => {
          this.isLoading = false;
          Notify(err.data.message);
          if (err.status == 404) {
            this.notFound = true;
          }
        });
    },
    goToIndex() {
      this.$router.push({
        path: "/",
        query: { role_uusn: this.$route.query.role_uusn }
      });
    }
  },
  components: {
    NotFound
  }
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>