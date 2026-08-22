<script setup lang="ts">
import { copyAnnonce, copyQuestGold, copyQuestGem } from '@/scripts/script.ts'
</script>

<template>
	<section class="border">
		<h2>Copier l'annonce de la quête</h2>
		<p>
			Pour copier l'annonce de la quête facilement, mettez les infos nécessaires (numéro de la
			quête, quête or/gemme, jour et heure).
		</p>
	</section>
	<!-- Début du form -->
	<form id="form">
		<section class="border left">
			<h2>Numéro de la quête</h2>
			<label> <input type="radio" name="numberQuest" value="1" /> Quête n°1 </label>
			<br />
			<label> <input type="radio" name="numberQuest" value="2" /> Quête n°2 </label>
			<br />
			<label> <input type="radio" name="numberQuest" value="3" /> Quête n°3 </label>
			<br />
			<label> <input type="radio" name="numberQuest" value="4" /> Quête n°4 </label>
			<br />
			<label> <input type="radio" name="numberQuest" value="5" /> Quête n°5 </label>
			<br /><br />
		</section>
		<section class="border left">
			<h2>Type de la quête</h2>
			<label> <input type="radio" name="typeQuest" value="400 or" /> Quête or </label>
			<br />
			<label> <input type="radio" name="typeQuest" value="80 gemmes" /> Quête gemme </label>
			<br /><br />
		</section>
		<section class="border left">
			<h2>Dates de la quête</h2>
			<div class="display-flex">
				<input id="date" type="date" />
			</div>
			<br /><br />
		</section>
		<section class="border">
			<section>
				<button type="button" @click="copyAnnonce()">Copier l'annonce</button>
			</section>
			<section>
				<button type="button" @click="copyQuestGold([])">
					Quête or gratuites
				</button>
			</section>
			<section>
				<button type="button" @click="copyQuestGem([])">
					Quête gemmes gratuites
				</button>
				<br /><br />
			</section>
		</section>
	</form>
	<!-- Fin du form -->
</template>
