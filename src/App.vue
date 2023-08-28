<template>
	<div class="container">
		<RouterView></RouterView>
	</div>
</template>

<style>
.container {
  margin: 0 auto;
  width: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

input {
  display: block;
  margin: 0.5rem;
}

button {
  margin: 0.5rem;
}

.hidden {
  display: none;
}
</style>
