import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// import { viteMockServe } from 'vite-plugin-mock'
import { wrapperEnv, isProdFn, isDevFn } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { configSvgIconsPlugin } from './build/vite/plugin/svgSprite'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const prodMock = true
  const root = process.cwd()
  const env = loadEnv(mode, root, 'VITE_')
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_APP_BASE_API } = viteEnv
  console.info('viteEnv-- ', VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_APP_BASE_API)
  const isBuild = command === 'build'
  const isDev = isDevFn(mode)
  console.log('path.resolve---> ', resolve(__dirname, 'src'))

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      configSvgIconsPlugin(isBuild)
      // viteMockServe({
      //   supportTs: false,
      //   mockPath: 'mock',
      //   localEnabled: command === 'serve',
      //   prodEnabled: command !== 'serve' && prodMock,
      //   injectCode: `
      //     import { setupProdMockServer } from './mockProdServer';
      //     setupProdMockServer();
      //   `
      // })
    ],
    resolve: {
      alias: {
        '@': resolve('./src'),
        '@img': resolve('./src/assets/img')
      },
      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: ['.js', '.jsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/assets/styles/index.scss";@import "@/assets/styles/variables.scss";@import "@/assets/styles/ruoyi.scss";`,
          additionalData: `@use '@/assets/styles/variables.scss' as *;`,
          // modifyVars: {
          //   hack: `true; @import (reference) "${resolve('@/assets/styles/variables.scss')}";`
          // },
          javascriptEnabled: true
        }
      }
    },
    server: {
      port: VITE_PORT,
      open: false,
      proxy: createProxy(VITE_PROXY)
      // proxy: {
      //   '`^${VITE_APP_BASE_API}`': {
      //     target: VITE_PROXY,
      //     changeOrigin: true,
      //     ws: true,
      //     rewrite: (path) => path.replace(new RegExp('^' + VITE_APP_BASE_API), '')
      //   }
      // }
    },
    build: {
      // sourcemap: true,
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'vuex'],
            'element-plus': ['element-plus'],
            echarts: ['echarts']
          }
        }
      },
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE
        }
      },
      chunkSizeWarningLimit: 500
    }
    // ,
    // define: {
    //   'process.env': viteEnv
    // }
  }
})
