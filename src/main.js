/*
 * @Author: yangyuan
 * @Date: 2020-04-14 21:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-14 21:39:08
 * @Description:
 */
import Vue from "vue";
import Application from "./App.vue";
import router from "./router";
import Toast from "@/components/toast";
import loading from "@/components/loading";
import pageLoading from "@/components/pageLoading";
import showModal from "@/components/showModal";

Vue.config.productionTip = false;

Vue.use(showModal);
Vue.use(loading);
Vue.use(pageLoading);
Vue.use(Toast);

router.beforeEach((to, from, next) => {
    if (
        to.name == "hdInsuranceLogin" &&
        window.localStorage.getItem("moblie")
    ) {
        //解决登陆后 用户输入登录地址重定向到首页
        next({ path: "/activity/hd/insurance/serverNianJian" });
    }

    if (to.meta.requireLogin) {
        // 页面是否需要登录
        if (window.localStorage.getItem("moblie")) {
            // token是否存在
            next();
        } else {
            next({ path: "/activity" });
        }
    } else {
        // 不需要登录的直接next()
        next();
    }
});

router.afterEach((to) => {
    document.title = to.meta.title;
});
new Vue({
    el: "#app",
    router,
    render: (h) => h(Application),
});