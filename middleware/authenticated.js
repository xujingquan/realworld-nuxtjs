/* 
*验证码是否登录的中间件
*/

export default function ({ store, redirect }) {
  // store 这个是vuex 的容器对象
  // redirect 重定向方法
  // 如果容器里面没有 user 则跳转到登录页面
  if (!store.state.user) {
    return redirect('/login')
  }
}