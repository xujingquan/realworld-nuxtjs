<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <div class="ng-scope" v-if="showTitle">
              <li class="ng-binding ng-scope">
                title can't be blank
              </li>
              <li class="ng-binding ng-scope">
                title is too short (minimum is 1 character)
              </li>
            </div>
            <div class="ng-scope">
              <li class="ng-binding ng-scope" v-if="showBody">
                body can't be blank
              </li>
            </div>
            <div class="ng-scope" v-if="showDescription">
              <li class="ng-binding ng-scope">
                description can't be blank
              </li>
              <li class="ng-binding ng-scope">
                description is too short (minimum is 1 character)
              </li>
            </div>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="PublishArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "../../api/article";

export default {
  //在路由匹配组件渲染之前会先执行中间件处理
  //有多个中间件可以写在数组里面,单个写在字符串里面,写文件文件名称
  middleware: "authenticated",
  name: "EditorIndex",
  components: {},
  data() {
    return {
      title: "",
      description: "",
      body: "",
      tagList: "",
      showTitle: false,
      showDescription: false,
      showBody: false,
      article: "",
    };
  },
  mounted() {},
  methods: {
    PublishArticle() {
      this.showTitle = false;
      this.showDescription = false;
      this.showBody = false;

      if (!this.title) {
        this.showTitle = true;
        return;
      }
      if (!this.description) {
        this.showDescription = true;
        return;
      }
      if (!this.body) {
        this.showBody = true;
        return;
      }
      this.createArticle();
    },
    createArticle() {
      let data = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList,
      };
      createArticle(data).then((res) => {
        if (res.status === 200) {
          this.title = "";
          this.description = "";
          this.body = "";
          this.tagList = "";
          this.article = res.data.article;
          //跳转详情
          this.$router.push({
            name: "article",
            params: {
              slug: this.article["slug"],
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped></style>
