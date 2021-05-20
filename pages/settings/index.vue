<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="yourname"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="about"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
              </fieldset>
              <div
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateUser"
              >
                Update Settings
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from "../../api/user";

export default {
  //在路由匹配组件渲染之前会先执行中间件处理
  //有多个中间件可以写在数组里面,单个写在字符串里面,写文件文件名称
  middleware: "authenticated",
  name: "SettingsIndex",
  components: {},
  data() {
    return {
      password: "",
    };
  },
  async asyncData(content) {
    const { data } = await getUser();
    let picture = data["user"]["image"];
    let yourname = data["user"]["username"];
    let about = data["user"]["bio"];
    let email = data["user"]["email"];
    let userData = data;
    return {
      picture,
      yourname,
      about,
      email,
      userData,
    };
  },
  mounted() {},
  methods: {
    updateUser() {
      let data = {
        email: this.email,
        bio: this.about,
        image: this.picture,
        username: this.yourname,
      };
      updateUser(data).then((res) => {
        if (res.status === 200) {
          // this.$router.push("/profile/123");
          this.$router.push({
            name: "profile",
            params: {
              username: this.userData.user.username,
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped></style>
