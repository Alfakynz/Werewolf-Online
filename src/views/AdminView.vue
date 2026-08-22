<script lang="ts">
export default {
	mounted() {
		document.querySelector("select[name='username']").addEventListener('change', function () {
			const selectedUsername = this.value
			const player = players.find((p) => p.username === selectedUsername)

			if (player) {
				document.querySelector("input[name='gold']").value = player.goldQuest || 0
				document.querySelector("input[name='gems']").value = player.gemQuest || 0
			}
		})
	},
}
</script>

<template>
	<section v-if="isAdmin" class="border">
		<h2>Modifier le nombre de quête</h2>
		<form action="/modifyQuests" method="post">
			<select name="username">
				<option selected disabled value="">Joueur</option>
				<option v-for="player in players" :value="player.username">
					{{ player.username }}
				</option>
			</select>
			<br /><br />
			<label>Quêtes or</label>
			<input type="number" name="gold" value="" />
			<br /><br />
			<label>Quêtes gemmes</label>
			<input type="number" name="gems" value="" />
			<br /><br />
			<button type="submit">Modifier</button>
			<br /><br />
		</form>
	</section>
	<section v-else class="border">
		<h2>Mot de passe admin</h2>
		<form action="/admin" method="post">
			<input type="password" placeholder="Mot de passe" name="testAdminPassword" value="" />
			<br /><br />
			<button type="submit">Se connecter</button>
		</form>
	</section>
</template>
