// import Vue from '../node_modules/vue/dist/vue.js'
import Vue from 'vue'
import App from './app.vue'
import './root.css'


new Vue({
    el:'#app',
    // 渲染方法，用于渲染app组件
    render:create=>create(App)
})
