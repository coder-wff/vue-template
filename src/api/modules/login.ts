import { Login } from '@/api/interface/index'
// import qs from 'qs'
import http from '@/api'

/**
 * @name 登录模块
 */
// * 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(`/login`, params, { headers: { noLoading: true } }) // 正常 post json 请求  ==>  application/json
	// return http.post<Login.ResLogin>(`/login`, params, { headers: { noLoading: true } }) // 控制当前请求不显示 loading\

	// return http.post<Login.ResLogin>(`/login`, {}, { params }) // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>(`/login`, qs.stringify(params)) // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
	// return http.get<Login.ResLogin>(`/login?${qs.stringify(params, { arrayFormat: 'repeat' })}`) // 如果是 get 请求可以携带数组等复杂参数
}
