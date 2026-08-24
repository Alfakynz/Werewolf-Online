<script setup lang="ts">
import SectionBlock from '@/components/common/SectionBlock.vue'

function copyText(text: string) {
	var textToCopy = text;
	navigator.clipboard.writeText(textToCopy).then(function () {
		alert('Le texte ' + '"' + textToCopy + '"' + ' a été copié!');
	})
}
</script>

<template>
	<SectionBlock title="Items cachés dans une partie">
		<p>
			Pour recevoir des items spéciaux, écrivez dans le tchat lors d'une partie :
		</p>
		<ol>
			<li>"Hello Wolvesville"</li>
			<li>"I love wov"</li>
		</ol>
		<div>
			<button class="items" @click="copyText('Hello Wolvesville')">Copier 1.</button>
			<button class="items" @click="copyText('I love wov')">Copier 2.</button>
		</div>
	</SectionBlock>
	<SectionBlock title="Items caché FAQ">
		<ol>
			<li>Cliquez sur le <span class="faq">?</span></li>
			<li>Cliquez sur FAQ</li>
			<li>Affichez tous les textes</li>
			<li>Cliquez sur le texte rose qui s'est affiché (I know everything!)</li>
			<li>Faites le quizz</li>
			<li>Récupérez le chapeau avec l'ampoule</li>
		</ol>
	</SectionBlock>
	<SectionBlock title="Succès">
		<ol>
			<li>Cliquez sur votre profil</li>
			<li>Cliquez sur succès</li>
			<li>Chercher le chasseur de tête</li>
			<li>Cliquer plusieurs fois sur son icône</li>
			<li>Récupérez la pancarte écris "vote"</li>
		</ol>
	</SectionBlock>
	<SectionBlock title="Sur ordinateur">
		<ol>
			<li>Connecter vous au jeu sur le site</li>
			<li>Récupérez les ordis du premier plan</li>
		</ol>
		<ol>
			<li>Accepter tous les cookies du site</li>
			<li>Récupérez le premier plan le loup qui mange un cookie</li>
		</ol>
		<ol>
			<li>Activez les notifications du site</li>
			<li>Récupérez la tombe qui ressemble à un pc</li>
		</ol>
		<ol>
			<li>Jouez une partie sur le site</li>
			<li>Récupérez le masque noir</li>
		</ol>
		<ol>
			<li>Dites: "I am playing on Wolvesville web" dans une partie</li>
			<li>Récupérez le chapeau en forme de boite rose</li>
		</ol>
		<button class="items" @click="copyText('I am playing on Wolvesville web')">Copier</button>
	</SectionBlock>
</template>
