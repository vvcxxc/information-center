import http from "./http"

/**
 * 获取店铺信息及优惠券活动
*/
export const getBannerImg = role_uusn =>
  http({
    url: "api/banner",
    method: "GET",
    params:role_uusn
  })

