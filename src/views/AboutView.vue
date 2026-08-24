<script setup lang="ts">
import SectionBlock from '@/components/common/SectionBlock.vue'
import Link from '@/components/common/Link.vue'
</script>

<template>
	<SectionBlock title="Le grind" id="grind">
		<p>
			Le grind c'est des parties pour faire gagner le village très rapidement pour gagner de l'xp.
			<br />
			Pour jouer des parties de grind, il suffit d'aller dans les parties personalisées en anglais et de rejoindre
			des parties (nommées généralement vill win). Il est possible que vous ne puissiez pas les voir si les
			créateurs ont réglé un niveau minimum que vous n'avez pas atteint.
		</p>
		<h2>Comment jouer ?</h2>
		<p>
			Si vous êtes loup garou, lors de la nuit tuez votre couple pour mourir et faire gagner le village. Si vous
			ou l'autre loup est le loup junior, il faut tuer le couple du loup junior pendant que celui ci se venge sur
			le couple de l'autre loup.
			<br />
			Si il reste des loups la journée (car pas de junior ou couple de loup), ils disent qui ils sont, il faut les
			tuer rapidement (m signifie me et si quelqu'un est voter, c'est un loup).
			<br />
			Si vous êtes villageois, ne faite rien la nuit, ce n'est pas nécessaire. Si nécessaire, avec le prêtre ou le
			tireur, tuer le(s) loup(s), et si votre couple est un loup et ne le dit pas, dites le et tuer le.
			<br />
			Certaines subtilitées vous viendront au fur et à mesure !
		</p>
	</SectionBlock>
	<SectionBlock title="Date de création du clan">
		<p>
			Le clan a été créer par NgloKante le 26 février 2019.
		</p>
	</SectionBlock>
	<SectionBlock title="Développeurs">
		<p>
			Le site du clan a été développé par le sous-chef <Link to="https://github.com/Alfakynz">Valtintin</Link> qui
			est maintenant aidé par la meilleure sous-cheffe : <Link to="https://github.com/Firelack">Firelack</Link>.
		</p>
	</SectionBlock>
	<SectionBlock title="Droits d'auteurs">
		<p>
			Ceci n'est pas un site web officiel de <Link to="https://www.wolvesville.com">Wolvesville</Link>.
			<br />
			Il a été créé pour un clan (WerewoIf OnIine*).
			<br />
			Il est hébergé par <Link to="https://vercel.com/">Vercel</Link>.
			<br />
			Le code source est hébergé sur <Link to="https://github.com/Alfakynz/Werewolf-Online">GitHub</Link>.
		</p>
	</SectionBlock>
</template>
