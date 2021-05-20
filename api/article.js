import { request } from "@/plugins/request";

// 获取文章
export const getArticles = (params) => {
  return request({
    method: "Get",
    url: "/api/articles",
    params,
  });
};

// 获取关注的文章列表
export const getFeedArticles = (params) => {
  return request({
    method: "Get",
    url: "/api/articles/feed",
    params,
  });
};

//添加点赞
export const addFavorite = (slug) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`,
    slug,
  });
};

//取消点赞
export const deleteFavorite = (slug) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`,
    slug,
  });
};

//获取文章详情
export const getArticle = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`,
    slug,
  });
};

//获取文章评论
export const getComments = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`,
  });
};

//发布文章
export const createArticle = (data) => {
  return request({
    method: "POST",
    url: "/api/articles",
    data,
  });
};
