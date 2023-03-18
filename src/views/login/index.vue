<template>
	<div class="login-container">login</div>
</template>

<script setup lang="ts" name="login">
import { useGlobalStore } from '@/stores'
import { onMounted } from 'vue'
import { loginApi } from '@/api/modules/login'
import md5 from 'js-md5'

const globalStore = useGlobalStore()
const num = ref(1)
console.log(num.value)
const token = globalStore.token
console.log('token', token)

onMounted(() => {
	loginApi({
		username: 'admin',
		password: md5('123456')
	})
		.then(res => {
			console.log('res', res)
		})
		.catch(err => {
			console.log(err)
		})
})
</script>
