import http from "./http"

/**
 * 文章列表banner
*/
export const getBannerImg = params =>
  http({
    url: "api/banner",
    method: "GET",
    params
  })

/**
* 文章分类
*/
export const getArticleClass = params =>
  http({
    url: "api/articleCategory",
    method: "GET",
    params
  })


/**
* 文章列表
*/
export const getArticleList = params =>
  http({
    url: "api/articleCategory/" + params.category_id + "/article",
    method: "GET",
    params
  })

/**
* 文章详情
*/
export const getArticleInfo = params =>
  http({
    url: "api/article/" + params.article_id,
    method: "GET",
    params
  })

/**
* 文章推荐列表
*/
export const getArticleOtherList = params =>
  http({
    url: "api/qualityArticle",
    method: "GET",
    params
  })


