<template>
	<div class="layout">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
.layout {
	width: min(620px, 100%);
	margin: 0 auto;
}
</style>