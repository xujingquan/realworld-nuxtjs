<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{article.title}}</h1>
        <article-meta :article='article'></article-meta>
      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article='article'></article-meta>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

         <article-comment :article='article'></article-comment>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import markdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta.vue';
import ArticleComment from './components/article-comment.vue';

export default {
  name: 'ArticleIndex',
  components: {
    ArticleMeta,
    ArticleComment
  },
  //优化SEO
   head() {
      return {
        //页面标题加网站名称
        title: `${this.article.title} - RealWorld`,
        meta: [
          {
            // 为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号
            hid: 'description',
            //名称
            name: 'description',
            //内容
            content: this.article.description
          }
        ]
      }
    },
  async asyncData({ params }){
   const { data } = await getArticle(params.slug)
   const { article } = data
   //markdowm 语法格式处理
   const md = new markdownIt()
   article.body = md.render(article.body)
   return {
     article
   }
  },
  methods: {

  },
};
</script>

<style scoped >
</style>
