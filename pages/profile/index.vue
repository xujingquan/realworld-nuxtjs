<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <nuxt-link to='/settings' class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </nuxt-link :to='{
              
            }'>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview"
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
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
              </div>
                 <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
                :disabled='article.favoriteDisabled'
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
                  name: 'profile',
                  query: {
                    page: item,
                    username: profile.username,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from "../../api/user";
import { getArticles, addFavorite, deleteFavorite } from "../../api/article";
export default {
  //在路由匹配组件渲染之前会先执行中间件处理
  //有多个中间件可以写在数组里面,单个写在字符串里面,写文件文件名称
  middleware: "authenticated",
  name: "ProfileIndex",
   watchQuery: ["page"],
    data() {
    return {
      username: "",
    };
  },
 
  async asyncData({ params, query }) {
    const { data } = await getProfile(params.username);
    const page = Number.parseInt(query.page || 1);
    const limit = 5;
    let articlesData = {
      author: params.username,
      offset: (page - 1) * limit,
      limit,
    };
    const articlesD = await getArticles(articlesData);
    let profile = data.profile;
    const { articles, articlesCount } = articlesD.data;
    return {
      profile,
      articles,
      articlesCount,
      limit,
      page,
    };
  },
  computed: {
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
