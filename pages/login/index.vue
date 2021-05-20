<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{isLogin ? ' Sign in' : ' Sign up'}}
          </h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin"
                       to='/register'>Need an account?</nuxt-link>
            <nuxt-link v-else
                       to='/login'>Have an account?</nuxt-link>

          </p>

          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="(message, index) in messages"
                  :key="index">{{field}} {{message}}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group"
                      v-if="!isLogin">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="Your Name"
                     required
                     v-model="user.username">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="email"
                     placeholder="Email"
                     required
                     v-model="user.email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="password"
                     placeholder="Password"
                     required
                     minlength="8"
                     v-model="user.password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin ? ' Sign in' : ' Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'

//安装js-cookie包后,加载入
//仅在客户端加载js-cookie，process.client这是nuxt提供的
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  data () {
    return {
      user: {
        username: '',
        email: '1002246707@qq.com',
        password: '1002246707quan'
      },
      errors: {}//错误信息
    }
  },
  mounted () {

  },
  methods: {
    async onSubmit () {
      try {
        //提交表单请求登录
        const { data } = this.isLogin
          ? await login({
            user: this.user
          })
          : await register({
            user: this.user
          })

        //保存用户登录状态到vuex
        this.$store.commit('setUser', data.user)

        //为了防止刷新页面数据丢失，我们需要把数据持久化(在客户端和服务端的可以被获取)
        Cookie.set('user', data.user)
        //跳转首页
        this.$router.push('/')
      } catch (err) {
        //捕获异常

        this.errors = err.response.data.errors
      }
    }
  }
};
</script>

<style scoped >
</style>
