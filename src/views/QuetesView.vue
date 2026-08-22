<script setup lang="ts">
import coin from '../images/coin.vue'
import b_coin from '../images/b_coin.vue'
import gem from '../images/gem.vue'
import b_gem from '../images/b_gem.vue'
</script>

<template>
	<section class="border">
		<h2>Déroulement</h2>
		<p>
			Vote des quêtes le lundi puis annonce de la 1ère quête le lundi à 20h.
			<br />
			Lancement de la quête le mardi à 20h.
			<br />
			Pour le reste des quêtes il n'y a pas de jour précis afin qu'on puisse en lancer autant
			que l'on veut, on préviendra toujours 24h à l'avance.
			<br />
			On vous conseille d'économiser l'or quand vous voyez que certaines quêtes de la semaine
			vous plaise afin de pouvoir donner directement étant donné les délais court.
			<br />
			Donner l'or / gemmes seulement après l'annonce de la quête et bien évidemment avant son
			lancement ! (il nous est impossible de vous rendre l'or ou de vous rajouter dans une
			quête en cours).
			<br />
			Il est possible qu'on vous envoie un message privé si vous n'arrivez pas à voir les
			annonces des quêtes à temps, pour cela prévenez nous pour qu'on vous mette dans la
			liste.
			<br />
			Il peut y avoir un événement pendant une quête.
			<br />
			ATTENTION, si vous votez une quête, vous devez y PARTICIPER, sinon vous aurez un MALUS
			(plus d'information plus bas).
		</p>
		<p>
			<a href="/events">En savoir plus sur les événements</a>
		</p>
	</section>
	<section>
		<table>
			<caption>
				Prix des quêtes
			</caption>
			<tr>
				<th>Quête</th>
				<th>Quête
					<coin />
				</th>
				<th>Quête
					<gem />
				</th>
			</tr>
			<tr>
				<th>Prix</th>
				<td>400
					<coin />
				</td>
				<td>150
					<gem />
				</td>
			</tr>
			<tr>
				<td colspan="3">
					Tout don autre que 150
					<gem /> ou 400
					<coin />
					sera compté comme un don au clan.
				</td>
			</tr>
		</table>
	</section>
	<section class="border">
		<h2>Malus
			<b_coin />
		</h2>
		<p>
			Les personnes faisant moins de 300xp par jour dans une quête auront un malus, tous les
			malus peuvent se cumuler.
			<br />
			Les 300xp sont comptés à la fin de la quête, si celle ci dure 3 jours, vous devez avoir
			fait 300*3 = 900xp au minimum.
			<br />
			Pour une durée normale de 6 jours, il faut donc faire un minimum de 1 800xp.
			<br />
			De même, si vous votez mais ne participez pas à la quête vous aurez un malus.
			<br />
			Pour chaque malus, vous devrez payer 400
			<coin /> de plus votre quête.
		</p>
		<p>Veuillez regarder les annonces du clan pour connaître les malus.</p>
	</section>
	<section class="border">
		<h2>Quêtes
			<b_coin /> gratuites
		</h2>
		<p>
			Les quêtes
			<coin /> peuvent être obtenues tous les 10 000xp contribués dans une quête.
			<br />
			Les quêtes si dessous ne sont pas à jour, merci de regarder les annonces du clan pour
			voir les véritables quêtes gratuites.
		</p>
		<p>
			<% players.sort((a, b)=> b.goldQuest - a.goldQuest); for (let i = 0; i < players.length; i++) { %>
					<% if (players[i].goldQuest> 0) { %> <%= players[i].username %> : <%= players[i].goldQuest %>
								<br />
								<% } %>
									<% } %>
		</p>
	</section>
	<section class="border">
		<h2>Comment utiliser les quêtes gratuites?</h2>
		<p>
			Faites un don de 1
			<coin /> au clan en mettant comme raison que vous utilisez 1 quête
			gratuite.
		</p>
	</section>
	<section class="border">
		<h2>Précision pour les quêtes
			<b_gem />
		</h2>
		<p>
			Les quêtes
			<gem /> sont à 150
			<gem />.
			<br />
			Cependant, le moyen utilisé pour avoir des gemmes est très long donc nous en faisons
			rarement.
			<br />
			Si il y a beaucoup d'inscrits, nous pourrons peut être en faire plus.
		</p>
	</section>
	<section class="border">
		<h2>Dettes</h2>
		<p>
			Vu que les
			<gem /> sont compliquées à avoir, il y a des dettes pour les personnes qui
			donnent pas assez pour une quête
			<gem />
			<br />
			Nous n'autorisons plus les dons en dessous des tarifs pour participer à une quête.
		</p>
		<p>ninaa_: 5
			<gem />
		</p>
	</section>
</template>
