<template>
	<div>
		<el-button type="primary" @click="handleClick">456</el-button>
		<el-icon>
			<UserFilled></UserFilled>
		</el-icon>
		<el-icon>
			<component :is="isFold ? 'Expend' : 'fold'"></component>
		</el-icon>
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const isFold = ref(false)

const handleClick = () => {
	ElMessage('this is a message.')
}
</script>

<style scoped></style>
