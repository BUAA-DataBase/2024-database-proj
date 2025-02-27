import vue from '@vitejs/plugin-vue'
//import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// import vitePluginCompression from 'vite-plugin-compression'
// import ViteComponents from 'unplugin-vue-components/vite'
// import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// import vueJsx from '@vitejs/plugin-vue-jsx'

export default () => {
  return {
    base: '/',
    plugins: [
      vue(),
      // createSvgIconsPlugin({
      //   iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      //   symbolId: 'icon-[dir]-[name]',
      // }),
      // vitePluginCompression({
      //   threshold: 1024 * 10,
      // }),
      // ViteComponents({
      //   resolvers: [NaiveUiResolver()],
      // }),
      // vueJsx(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./src/styles/variables.scss" as *;',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: path.resolve(process.cwd(), 'src') + '/',
        },
      ],
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://182.92.164.178:1024', // 目标服务器地址
          changeOrigin: true, // 修改请求头中的 `origin`
        },
      },
    },
  }
}
