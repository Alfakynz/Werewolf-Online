<script setup lang="ts">
import coin from '@/images/coin.vue'
import rose from '@/images/rose.vue'

const srcImgWaiting = 'src/images/enattente.jpg'

const srcImg = 'src/images/enattente.jpg'
const srcImgNext = srcImg
const dayNextQuest = ''
</script>

<template>
	<section class="border">
		<h2>Bienvenue sur le site du clan Werewolf Online !</h2>
		<p>
			Vous pouvez avoir accès aux règles, aux quêtes, aux évènements du clan mais aussi aux
			différents items cachés du jeu et un questionnaire permettant de gagner 10
			<coin />. Les
			quêtes gratuites ne sont pas forcément à jour sur ce site, pour être sûr d'avoir les
			vrai nombres, suivez les annonces dans le clan.
		</p>
	</section>
	<section class="border">
		<h2>Prochaine quête</h2>
		<img class="skin" :src="srcImgNext" />
		<p v-if="srcImgNext != srcImgWaiting">
			Vous pouvez avoir accès aux règles, aux quêtes, aux évènements du clan mais aussi aux
			différents items cachés du jeu et un questionnaire permettant de gagner 10
			<rose />. Les
			quêtes gratuites ne sont pas forcément à jour sur ce site, pour être sûr d'avoir les
			vrai nombres, suivez les annonces dans le clan.
		</p>
	</section>
	<section class="border">
		<h2>Prochaine quête</h2>
		<img class="skin" :src="srcImgNext" />
		<p v-if="srcImgNext != srcImgWaiting">
			La prochaine quête sera une quête
			<!--img :class="currency[0]" src="currency[1]" /-->
			<br />
			La quête commencera {{ dayNextQuest }}
			<br />
			<!--Il y aura l'évènement <a href="/events#vivivslg">Villageois VS loup-garous</a> lors de cette quête-->
			Il n'y aura pas d'évènement lors de cette quête.
		</p>
		<p>Participants pour le moment : (ne sont pas forcément les véritables participants)</p>
		<!--p>
        <span v-for="participant in nextParticipants" :key="participant">{{ participant }}</span>
    </p-->
	</section>
	<section class="border">
		<h2>Quête actuelle</h2>
		<img class="skin" :src="srcImg" />
		<p>
			<!--{{ date }}-->
			<span v-if="srcImg != srcImgWaiting">
				<br />
				Il n'y a pas d'évènement lors de cette quête.
			</span>
		</p>
		<!--p v-if="srcImg != 'images/enattente.jpg'">
        <span v-for="participant in participantsData" :key="participant.username">
                {{ participant.username }} : {{ participant.xp }}xp<br />
        </span>
    </p-->
	</section>
	<section class="border">
		<h2>Évènement actuel</h2>
		<p>Aucun évènement n'est en cours actuellement.</p>
		<p>
			<a href="/events">En savoir plus sur les évènements</a>
		</p>
	</section>
	<!--section class="border">
    <h2>Évènement actuel</h2>
    <p>
        <a href="/events#vivivslg">Villageois VS loup-garous</a>
    </p>
    <p>
        <a href="/events">En savoir plus sur l'évènement</a>
    </p>
</section-->
</template>
