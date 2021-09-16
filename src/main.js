import { createApp } from 'vue'
import App from './App.vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/theme-chalk/index.css'
// import '@/assets/styles/index.scss' // global css
// import '@/assets/styles/ruoyi.scss' // ruoyi css
import store from './store'
import router from './router'
import directive from './directive' //directive

import './permission' // permission control
import { getDicts } from './api/system/dict/data'
import { getConfigKey } from './api/system/config'
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from './utils/ruoyi'
import Pagination from '@/components/Pagination/index.vue'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar/index.vue'
// 富文本组件
import Editor from '@/components/Editor/index.vue'
// 文件上传组件
import FileUpload from '@/components/FileUpload/index.vue'
// 图片上传组件
import ImageUpload from '@/components/ImageUpload/index.vue'
// 字典标签组件
import DictTag from '@/components/DictTag/index.vue'
// 头部标签组件
// import VueMeta from 'vue-meta'
import SvgIcon from '@/components/SvgIcon/index.vue'
// 这非常重要，vite plugin配置后，必须import，不然无法读取到内容
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(store).use(router)

// 全局方法挂载
app.config.globalProperties.getDicts=getDicts
app.config.globalProperties.getConfigKey = getConfigKey
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels
app.config.globalProperties.handleTree = handleTree

app.config.globalProperties.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

app.config.globalProperties.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

app.config.globalProperties.msgInfo = function (msg) {
  this.$message.info(msg)
}

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('RightToolbar', RightToolbar)
app.component('Editor', Editor)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('svg-icon', SvgIcon)

app.use(directive)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

app.use(ElementPlus, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

app.config.productionTip = false


app.mount('#app')

export default app
