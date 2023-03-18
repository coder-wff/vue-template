import { ConfigEnv, defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 配置 element-plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 配置 element-plus 特殊组件自动导入样式
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { resolve } from 'path'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	console.log('mode', mode)
	console.log('vueSetupExtend', vueSetupExtend)

	return {
		base: './',
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: '0.0.0.0',
			port: 5173,
			open: true,
			cors: true,
			// 跨域代理配置
			proxy: {
				'/api': {
					target: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e', // easymock
					// target: 'https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0', // fastmock
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, '')
				}
			}
		},
		plugins: [
			vue(),
			// element-plus 按需导入
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [ElementPlusResolver()]
			}),
			// 配置 element-plus 特殊组件自动导入样式
			createStyleImportPlugin({
				resolves: [ElementPlusResolve()],
				libs: [
					{
						libraryName: 'element-plus',
						esModule: true,
						resolveStyle: (name: string) => {
							return `element-plus/theme-chalk/${name}.css`
						}
					}
				]
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * name 可以写在 script 标签上
			vueSetupExtend(),
			// * vite 可以使用 jsx/tsx 语法
			vueJsx()
		]
	}
})
