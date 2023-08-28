import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Login from './pages/Login.vue'
import User from './pages/User.vue'

const app = createApp(App)
app.use(createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Login,
		},
		{
			path: '/user/:username',
			component: User,
		},
	],
}))
app.mount('#app')
