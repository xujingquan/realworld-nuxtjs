//与请求相关的插件,使用插件是确保能够获取数据,使用普通方式是获取不到的
//封装axios
import axios from "axios";
//插件请求对象
export const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});
//通过插件机制获取到上下文响应对象
//例如(query,params,req,res,app,store ...)
//插件导出函数必须作为 default成员(default只能有一个)
export default ({ store }) => {
  //请求拦截器
  //任何请求都要经过请求拦截器
  //我们可以在请求拦截器中做一些公共的业务处理,例如统一设置 token
  request.interceptors.request.use(
    (config) => {
      //请求会经过这里
      const { user } = store.state;
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
      //返回config 请求配置对象
      return config;
    },
    (error) => {
      //如果请求失败（此时请求还没有发出去）就会进入这里
      return Promise.reject(error);
    }
  );
};

//相应拦截器

// export default request;
