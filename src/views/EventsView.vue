<script setup lang="ts">
import coin from '@/images/coin.vue'
import rose from '@/images/rose.vue'
import b_rose from '@/images/b_rose.vue'
import bouquet from '@/images/bouquet.vue'
import heart from '@/images/heart.vue'
import villager from '@/images/villager.vue'
import werewolf from '@/images/werewolf.vue'
</script>

<template>
	<section class="border">
		<h2>Évènements ?</h2>
		<p>
			Les évènements sont faits pendant les quêtes ou hors-quêtes. Ils permettent de gagner
			des récompenses supplémentaires (souvent des
			<rose /> ou des quêtes
			<coin /> gratuites
			qui seront données par Soline ou les sous-chefs).
			<br />
			Les évènements permettent de mettre les membres du clan en compétition tout en
			s'amusant.
			<br /><br />
			Les évènements actuels ont une bordure jaune.
			<br />
			Les évènements permanents ont une bordure rouge.
			<br />
			Les prochains évènements seront avec une bordure bleu.
		</p>
	</section>
	<section class="border">
		<h2>
			<bouquet /> Bouquet Party
			<bouquet />
		</h2>
		<p>
			Chaque dernier vendredi du mois, la cheffe organise une bouquet party entre les membres
			du clan. C'est une partie grind ou vous êtes obligé de tous donner 5
			<coin />, vous
			gagnerez donc tous 75
			<rose />.
			<br />
			Vous trouverez des
			<coin /> : dans le battle pass, dans les récompenses quotidiennes et
			vous pouvez même les acheter dans l'inventaire pour 250
			<coin />.
			<br />
			Une annonce sera faites 1 semaine avant l'évènement mais vous pouvez déjà économiser si
			ça vous intéresse.
		</p>
	</section>
	<section class="event-permanent">
		<h2>Chasse à l'xp mensuel</h2>
		<p>
			Cet évènement se déroule tous les mois, il faut faire le plus d'xp en une partie pour
			monter dans le classement. Pour le prouver il faut prendre une capture et l'envoyer sur
			discord.
		</p>
	</section>
	<section class="border">
		<h2>1 VS 1</h2>
		<p>
			Cet évènement se déroule quand on veut sur une durée de deux ou trois jours. Le chef et
			/ ou sous chefs forment les binômes. Avec votre adversaire, vous pariez une somme de
			<rose />, celui qui fait moins d'xp que son adversaire doit donner le nombre de
			<rose /> pariées à son adversaire.
		</p>
	</section>
	<section class="border">
		<h2>Mini évènement</h2>
		<p>
			Cet évènement peut commencer n'importe quand. Il peut se trouver n'importe où dans le
			clan (bilan général, messages épinglés, annonces, ...).
			<br />
			Il y a 5 vainqueurs, le premier gagnera 5
			<rose />, le deuxième 4, le troisième 3, le
			quatrième 2 et le cinquième 1
			<rose />.
		</p>
	</section>
	<section class="border">
		<h2>
			<heart /> Double peine
			<b_rose />
		</h2>
		<p>
			Dans cet évènement, il y a plusieurs équipes de 2 personnes. Les 2 premiers couples
			ayant le plus d'xp dans la quête gagneront 50
			<rose />.
		</p>
	</section>
	<section class="border" id="vivivslg">
		<h2>
			<villager /> Villageois VS Loup-garou
			<werewolf />
		</h2>
		<p>
			Dans cet évènement, il y a deux équipes, les villageois et les loups-garou. L'équipe
			ayant le plus d'xp gagne soit des
			<rose /> soit une quête
			<coin /> gratuite.
		</p>
	</section>
	<section class="border">
		<h2>
			<b_rose /> Week-end roses
			<b_rose />
		</h2>
		<p>
			Cet évènement permet de gagner 5
			<rose /> tous les niveaux que l'on passe pendant
			l'évènement souvent d'une durée de 2 jours.
		</p>
	</section>
	<section class="border">
		<h2>Chasse à l'xp</h2>
		<p>
			Cet évènement se déroule lors d'une quête, il faut faire le plus d'xp en une partie pour
			gagner. Pour le prouver il faut prendre une capture et l'envoyer sur discord.
		</p>
	</section>
</template>
