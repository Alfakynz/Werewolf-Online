<script setup lang="ts">
import coin from '@/images/coin.vue'
import rose from '@/images/rose.vue'
</script>

<template>
	<section id="bonus-malus" class="border">
		<h2>Bonus / malus</h2>
		<p>
			Tous les 10 000xp lors d'une quête, 1 quête
			<coin /> gratuite.
			<br />
			Moins de 300xp par jour lors d'une quête, vous obtenez un malus de 400
			<coin /> pour la prochaine quête
			<coin />
			(cumulable).
			<br />
			Les 300xp sont comptés à la fin de la quête, si celle ci dure 3 jours, vous devez avoir
			fait 300*3=900xp au minimum. Pour une durée normale de 6 jours, il faut donc faire un
			minimum de 1 800xp.
			<br />
			Si vous votez une quête et que vous n'y participez pas, vous aurez le même malus
			<coin />.
		</p>
	</section>
	<section id="100kxp" class="border">
		<h2>Tous les 100k xp contribué au clan</h2>
		<p>
			Vous pouvez choisir entre (à réclamer) :
			<br /><br />
			3 quêtes
			<coin /> gratuites
			<br />
			90
			<rose />
		</p>
	</section>
</template>
