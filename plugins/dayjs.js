import vue from "vue";
import dayjs from "dayjs";

// { 表达式 | 过滤器 }
vue.filter("date", (value, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(value).format(format);
});
