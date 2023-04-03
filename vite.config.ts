import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
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
import { wrapperEnv } from './src/utils/getEnv'

import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd())
	const viteEnv = wrapperEnv(env)

	return {
		base: './',
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		css: {
			// 指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键。每个预处理器支持的选项可以在它们各自的文档中找到：
			preprocessorOptions: {
				scss: {
					// 所有预处理器选项还支持 additionalData 选项，可以用于为每个样式内容注入额外代码。
					additionalData: `@import "@/styles/var.scss";`
				}
			}
		},
		server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: '0.0.0.0',
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
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
				resolvers: [ElementPlusResolver()],
				imports: ['vue', 'vue-router', 'pinia']
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
			vueJsx(),
			// * 是否生成包预览(分析依赖包大小,方便做优化处理)
			viteEnv.VITE_REPORT && visualizer(),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: 'gzip',
					ext: '.gz'
				})
		],
		// * 打包去除 console.log && debugger
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
		},
		build: {
			outDir: 'dist',
			minify: 'esbuild',
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		}
	}
})
