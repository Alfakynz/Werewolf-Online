<script setup lang="ts">
import SectionBlock from '@/components/common/SectionBlock.vue'
import Copy from '@/assets/images/Copy.vue';
import Copied from '@/assets/images/Copied.vue';

import { reactive } from 'vue'

const copiedStates = reactive<Record<string, boolean>>({})
const timers: Record<string, ReturnType<typeof setTimeout>> = {}

function copyText(text: string, key: string): void {
	navigator.clipboard.writeText(text)

	copiedStates[key] = true

	if (timers[key]) clearTimeout(timers[key])
	timers[key] = setTimeout(() => {
		copiedStates[key] = false
	}, 2000)
}
</script>

<template>
	<SectionBlock title="Items cachés dans une partie">
		<p>
			Pour recevoir des items spéciaux, écriver dans le tchat lors d'une partie :
		</p>
		<ol>
			<li>
				"Hello Wolvesville"
				<button class="items" @click="copyText('Hello Wolvesville', 'btn1')">
					<Copy v-if="!copiedStates.btn1" />
					<Copied v-else />
				</button>
			</li>
			<li>
				"I love wov"
				<button class="items" @click="copyText('I love wov', 'btn2')">
					<Copy v-if="!copiedStates.btn2" />
					<Copied v-else />
				</button>
			</li>
		</ol>
	</SectionBlock>
	<SectionBlock title="Items cachés FAQ">
		<ol>
			<li>Cliquer sur le <span class="faq">?</span></li>
			<li>Cliquer sur FAQ</li>
			<li>Afficher tous les textes</li>
			<li>Cliquer sur le texte rose qui s'est affiché <span style="color: deeppink;">(I know everything!)</span>
			</li>
			<li>Faire le quizz</li>
			<li>Récupérer le chapeau avec l'ampoule</li>
		</ol>
	</SectionBlock>
	<SectionBlock title="Succès">
		<ol>
			<li>Cliquer sur votre profil</li>
			<li>Cliquer sur succès</li>
			<li>Chercher le chasseur de tête</li>
			<li>Cliquer plusieurs fois sur son icône</li>
			<li>Récupérer la pancarte écris "vote"</li>
		</ol>
	</SectionBlock>
	<SectionBlock title="Sur ordinateur">
		<ol>
			<li>Connecter vous au jeu sur le site</li>
			<li>Récupérer les ordis du premier plan</li>
		</ol>
		<ol>
			<li>Accepter tous les cookies du site</li>
			<li>Récupérer le premier plan le loup qui mange un cookie</li>
		</ol>
		<ol>
			<li>Activer les notifications du site</li>
			<li>Récupérer la tombe qui ressemble à un pc</li>
		</ol>
		<ol>
			<li>Jouer une partie sur le site</li>
			<li>Récupérer le masque noir</li>
		</ol>
		<ol>
			<li>
				Dire: "I am playing on Wolvesville web" dans une partie
				<button class="items" @click="copyText('I am playing on Wolvesville web', 'btn3')">
					<Copy v-if="!copiedStates.btn3" />
					<Copied v-else />
				</button>
			</li>
			<li>Récupérer le chapeau en forme de boite rose</li>
		</ol>
	</SectionBlock>
</template>
