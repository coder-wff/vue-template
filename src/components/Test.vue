<template>
	<div>
		<el-button type="primary" @click="handleClick">456</el-button>
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
const handleClick = () => {
	ElMessage('this is a message.')
}
</script>

<style scoped></style>
