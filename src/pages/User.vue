<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'

const router = useRouter()
const route = useRoute()

const flag = useLocalStorage('flag', false)

function logout() {
	router.push('/')
	flag.value = true
	navigator.credentials.preventSilentAccess()
}
</script>

<template>
	<div>
		You have logged as {{ route.params.username }}
	</div>
	<button id="btnLogout" @click="logout">
		Logout
	</button>
</template>
