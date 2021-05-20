//不需要导入vuex

//加载cookieparser包
const cookieparser = process.server ? require('cookieparser') : undefined
//state是一个函数
//为了防止在服务端渲染其中运行都是同一个实例
//为了防止数据冲突,务必要把 state 定义成一个函数，返回数据对象  
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null 
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调用
  // 作用：初始化容器数据，传递数据给客户端
  nuxtServerInit ({ commit }, { req }) {
    // commit 是提交mutastions 方法
    // req 是渲染期间的请求对象
    let user = null
    //如果请求头中有 Cookie
    if (req.headers.cookie) {
      //使用 cookieparser 包,把cookie字符串转为 JavaScript 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}