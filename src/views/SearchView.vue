<script setup lang="ts">
const srcImg = '@images/enattente.png'
</script>

<template>
	<section class="border">
		<h2>Entrez le pseudo de quelqu'un</h2>
		<form class="searchForm" action="/search" method="post">
			<input v-if="player" name="username" type="search" placeholder="Chercher un joueur"
				value="<%= player.username %>" />
			<input v-else name="username" type="search" placeholder="Chercher un joueur" />
			<button type="submit">Chercher</button>
		</form>
	</section>
	<% if (player) { %>
		<section class="border">
			<section>
				<h2>
					<%= player.username %> - Niveau <%= player.level %>
				</h2>
				<p>
					<b>Bio :</b>
					<br />
					<% for (let i=0; i < bio.length; i++) { %>
						<%= bio[i] %>
							<br />
							<% } %>
				</p>
				<p>
					<b>Dernière connexion :</b>
					<%= dateOnline %>
						<br />
						<b>Création du compte :</b>
						<%= dateCompte %>
							<br />
							<b>Roses reçues :</b>
							<%= player.receivedRosesCount %>
								<br />
								<b>Roses envoyées :</b>
								<%= player.sentRosesCount %>
									<br />
									<b>Status :</b>
									<%= player.status.toLowerCase() %>
										<br />
										<b>Clan :</b>
										<%= searchClanName %>
				</p>
			</section>
			<section>
				<details>
					<summary class="summary">Cartes :</summary>
					<% for (let i=0; i < player.roleCards.length; i++) { %>
						<div class="roleCard">
							<b>Rôle :</b>
							<%= player.roleCards[i].roleId1 %>
								<br />
								<b>Rareté :</b>
								<% if (player.roleCards[i].rarity=="COMMON" ) { %>
									<span style="color:gray;">
										<%= player.roleCards[i].rarity.toLowerCase() %>
									</span>
									<% } else if (player.roleCards[i].rarity=="RARE" ) { %>
										<span style="color:blue;">
											<%= player.roleCards[i].rarity.toLowerCase() %>
										</span>
										<% } else if (player.roleCards[i].rarity=="EPIC" ) { %>
											<span style="color:purple;">
												<%= player.roleCards[i].rarity.toLowerCase() %>
											</span>
											<% } else if (player.roleCards[i].rarity=="LEGENDARY" ) { %>
												<span style="color:yellow;">
													<%= player.roleCards[i].rarity.toLowerCase() %>
												</span>
												<% } else if (player.roleCards[i].rarity=="MYTHICAL" ) { %>
													<span style="color:red;">
														<%= player.roleCards[i].rarity.toLowerCase() %>
													</span>
													<% } %>
						</div>
						<% } %>
				</details>
			</section>
			<section>
				<img :src="srcImg" class="skin-player" />
			</section>
		</section>
		<% } else if (bio !="" ) { %>
			<section class="border">
				<h2 style="color:red;">
					<%= bio %>
				</h2>
				<p>
					Rentrez un autre pseudo ou vérifiez l'orthographe du pseudo
				</p>
			</section>
			<% } %>
</template>
