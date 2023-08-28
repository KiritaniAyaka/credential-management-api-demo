<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'

const router = useRouter()

const flag = useLocalStorage('flag', false)

const usernameRef = ref('')
const passwordRef = ref('')

const showLoginForm = ref(false)

// a fake login function to simulate network request to login
function fakeLogin(username, password) {
	const userList = [
		{
			username: 'usera',
			password: '123456',
		},
		{
			username: 'userb',
			password: 'abc',
		},
	]

	return userList.find(u => u.username === username)?.password === password
}

function login(username, password) {
	console.log('login')
	username ??= usernameRef.value
	password ??= passwordRef.value
	console.log(username, password)

	if (!fakeLogin(username, password)) {
		alert('username and password does not match')
	} else { // login successful
		router.push(`/user/${username}`)
		flag.value = false
		if (!window.PasswordCredential) {
			console.log('Your agent not support PasswordCredential or you are in an unsafe context.')
		} else {
			const credential = new PasswordCredential({ id: username, password })
			navigator.credentials.store(credential)
			console.log('credential saved', credential)
		}
	}
}

async function showLogin() {
	// user wants to login
	const cred = await navigator.credentials.get({ password: true, mediation: 'silent' })
	if (cred) { // it could login silently
		login(cred.id, cred.password)
	} else {
		// silent login not avaliable, show a login form
		showLoginForm.value = true
		// If you are sure that user won't be confused to see the Chrome identity selector,
		// you can just use `navigator.credential.get({ password: true })` to let user select an identity they want
	}

	// another practice
	// remember to comment the code out above
	/*
		if (flag.value) {
			return showLoginForm.value = true
		}
		const cred = await navigator.credentials.get({ password: true })
		if (!cred) {
			showLoginForm.value = true
		} else {
			login(cred.id, cred.password)
		}
	*/
}
</script>

<template>
	<template v-if="showLoginForm">
		<input v-model="usernameRef" type="text" name="username" autocomplete="off" />
		<input v-model="passwordRef" type="password" name="password" autocomplete="off" />
		<button @click="login()">
			Login
		</button>
	</template>
	<button v-else @click="showLogin">
		Login
	</button>
</template>
