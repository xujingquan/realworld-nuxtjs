<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="author">
         <nuxt-link
      :to="{
        params: {
          username: article.author.username,
        },
      }"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <button 
    :class="{ active : article.author.foolowing }"
    class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button 
     :class="{ active : article.favorited }"
    class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      //表示值是必须的
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped></style>
