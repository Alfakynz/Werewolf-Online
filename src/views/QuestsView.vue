<script setup lang="ts">
import SectionBlock from '@/components/common/SectionBlock.vue'
import Gold from '@/assets/images/Gold.vue'
import BGold from '@/assets/images/BGold.vue'
import Gem from '@/assets/images/Gem.vue'
import BGem from '@/assets/images/BGem.vue'
</script>

<template>
	<SectionBlock title="Déroulement">
		<p>
			Vote des quêtes le lundi puis annonce de la 1ère quête le lundi à 20h.
			<br />
			Lancement de la quête le mardi à 20h.
			<br />
			Pour le reste des quêtes il n'y a pas de jour précis afin qu'on puisse en lancer autant que l'on veut, on
			préviendra toujours 24h à l'avance.
			<br />
			On vous conseille d'économiser l'or quand vous voyez que certaines quêtes de la semaine vous plaise afin de
			pouvoir donner directement étant donné les délais court.
			<br />
			Donner l'or / gemmes seulement après l'annonce de la quête et bien évidemment avant son lancement ! (il nous
			est impossible de vous rendre l'or ou de vous rajouter dans une quête en cours).
			<br />
			Il est possible qu'on vous envoie un message privé si vous n'arrivez pas à voir les annonces des quêtes à
			temps, pour cela prévenez nous pour qu'on vous mette dans la liste.
			<br />
			Il peut y avoir un événement pendant une quête.
			<br />
			ATTENTION, si vous votez une quête, vous devez y PARTICIPER, sinon vous aurez un MALUS (plus d'information
			plus bas).
		</p>
	</SectionBlock>
	<section class="table">
		<table>
			<caption>Prix des quêtes</caption>
			<tr>
				<th>Quête</th>
				<th>
					Quête
					<Gold />
				</th>
				<th>
					Quête
					<Gem />
				</th>
			</tr>
			<tr>
				<th>Prix</th>
				<td>
					400
					<Gold />
				</td>
				<td>
					150
					<Gem />
				</td>
			</tr>
			<tr>
				<td colspan="3">
					Tout don autre que 150
					<Gem /> ou 400
					<Gold /> sera compté comme un don au clan.
				</td>
			</tr>
		</table>
	</section>
	<SectionBlock title="Malus" :img="BGold">
		<p>
			Les personnes faisant moins de 300xp par jour dans une quête auront un malus, tous les malus peuvent se
			cumuler.
			<br />
			Les 300xp sont comptés à la fin de la quête, si celle ci dure 3 jours, vous devez avoir fait 300*3 = 900xp
			au minimum.
			Pour une durée normale de 6 jours, il faut donc faire un minimum de 1 800xp.
			<br />
			De même, si vous votez mais ne participez pas à la quête vous aurez un malus.
			<br />
			Pour chaque malus, vous devrez payer 400
			<Gold /> de plus votre quête au clan (ou n'importe quand mais précisez malus en raison du don).
		</p>
	</SectionBlock>
	<SectionBlock title="Bonus" :img="BGold">
		<p>
			Les bonus sont des quêtes
			<Gold /> gratuites qui peuvent être obtenus tous les 10 000xp contribués dans une quête.
			<br /> Les quêtes
			<Gold /> gratuites sont utilisables uniquement pour les quêtes
			<Gold />.
			Pour utiliser une quête gratuites, il vous suffit de donner 1
			<Gold /> au clan et de mettre que vous voulez
			utiliser votre quête gratuite en raison.
			<br />
			Les quêtes si dessous ne sont pas à jour, merci de regarder les annonces du clan pour voir les véritables
			quêtes
			<Gold /> gratuites.
		</p>
	</SectionBlock>
	<SectionBlock title="Précision pour les quêtes" :img="BGem">
		<p>
			Les
			<Gem /> étant plus compliqués à obtenir, nous faisons rarement des quêtes
			<Gem />. Si il y a
			beaucoup d'inscrit pour les quêtes
			<Gem />, ils nous est possible d'en faire plus facilement.
			Même si nous en faisons rarement, veuillez tout de même suivre les annonces du clan pour voir si c'est une
			quête
			<Gem /> ou
			<Gold />.
		</p>
	</SectionBlock>
</template>
