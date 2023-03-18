<template>
	<div class="login-container">login</div>
</template>

<script setup lang="ts" name="login">
import { useGlobalStore } from '@/stores'

const globalStore = useGlobalStore()

const token = globalStore.token
console.log('token', token)
</script>
