<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                >
                  #{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <!-- <a href="profile.html"></a> -->
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
            <!-- <a href=""> </a> -->
          </div>

          <ul class="pagination">
            <li
              class="page-item"
              v-for="item in totalPage"
              :key="item"
              :class="{ active: item === page }"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item,
                  },
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite,
} from "../../api/article";
import { getTags } from "../../api/tag";
import { mapState } from "vuex";

export default {
  name: "HomeIndex",
  //默认情况下，query 的改变不会调用asyncData方法。如果要监听这个行为，例如，在构建分页组件时，
  //您可以设置应通过页面组件的watchQuery属性监听参数。下面监听的是page属性
  //当tag和 page  发生变化  就会触发asyncData方法
  watchQuery: ["page", "tag", "tab"],
  data() {
    return {};
  },
  // asyncData这里面渲染的函数是有利于 SEO 的
  //括号里面可以获取动态路由数据
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const { tag } = query;
    const tab = query.tab || "global_feed";
    const loadArticles =
      store.state.user && tab === "your_feed" ? getFeedArticles : getArticles;
    // const { data } = await getArticles({
    //   limit,
    //   offset: (page - 1) * limit,
    // });

    // const { data: tagData } = await getTags();

    //有多个连续的异步操作,并且没有依赖可以并行处理
    //接口优化,并行处理
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);

    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;
    //给按钮添加一个是否禁用状态
    articles.forEach((article) => (article.favoriteDisabled = false));
    // 自动放入 data函数中
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab: query.tab || "global_feed",
    };
    // 自动放入 data函数中
    // return {
    //   articles: data.articles,
    //   articlesCount: data.articlesCount,
    //   limit,
    //   page,
    //   tags: tagData.tags,
    // };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      //总页码
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        //已经点赞旧取消
        // deleteFavorite
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // addFavorite
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>

<style scoped></style>
