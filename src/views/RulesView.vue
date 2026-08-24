<script setup lang="ts">
import SectionBlock from '@/components/common/SectionBlock.vue'
import Gold from '@/assets/images/Gold.vue'
import Rose from '@/assets/images/Rose.vue'
</script>

<template>
    <SectionBlock title="Absences et inactivités">
        <p>
            Expulsion au bout d'une semaine de non connexion.
            <br />
            2000 xp minimum par semaine, vérification tous les dimanches, sinon, vous risquez d'être expulsé pour
            inactivitée.
            <br />
            Oubliez pas de prévenir en cas d'absences.
            Envoyez un message privé a la chef de préférence pour être sûr que le message sera vu.
        </p>
    </SectionBlock>
    <SectionBlock title="Vous ne faites pas 2000xp ?">
        <p>
            Notre but dans ce clan est d'avoir des joueurs assez actifs si possible, mais aussi de trouver des gens qui
            vont parler dans le chat du clan, qui voudront jouer avec nous !
            Si vous ne faites pas l'xp qu'il faut, mais que vous nous parler, vous ne serez pas banni.
            <br />
            Cette demande d'xp est surtout valable pour les gens qui ne participent pas à la vie du clan.
            <br />
            CEPENDANT, si vous participez aux quêtes, nous serons dans ce cas beaucoup plus regardant sur l'xp, car cela
            peut nous bloquer d'avoir des joueurs qui ne font pas d'xp sur les quêtes.
            <br />
            Si vous jouez et faites de l'xp, n'hésitez par contre pas à faire les quêtes, c'est toujours agréable de
            voir que du monde participe !
        </p>
    </SectionBlock>
    <SectionBlock title="Ban définitif">
        <p>
            On ban définitivement les trollers, les homophobes et tous les comportements inappropriés (anti-jeu,
            team-up, injure, random...) même si il n'y a pas de membre du clan dans la partie.
        </p>
    </SectionBlock>
    <SectionBlock title="Grind">
        <p>
            Le grind est autorisé.
            <br /><br />
            Pour avoir des explications sur le grind : <RouterLink to="/about#grind">cliquez ici</RouterLink>.
        </p>
    </SectionBlock>
    <SectionBlock title="Bonus / Malus et quêtes">
        <p>
            Voir la page sur les quêtes <RouterLink to="/quests">ici</RouterLink>.
        </p>
    </SectionBlock>
    <SectionBlock title="Tous les 100k xp contribué au clan">
        <p>
            Vous pouvez choisir entre (à réclamer) :
            <br /><br />
            3 quêtes
            <Gold /> gratuites
            <br />
            90
            <Rose /> à réclamer
        </p>
    </SectionBlock>
    <SectionBlock title="Comment mute le tchat du clan ?">
        <p>
            Vu qu'on est un clan qui parle beaucoup, il est possible que vous soyez dérangé par les messages.
        </p>
        <p>
            Pour enlever les notifications du tchat, il faut :
            <br />
            Cliquez sur le blason du clan
            <br />
            Cliquez sur l'onglet réglages
            <br />
            Décochez l'option "Tchat"
        </p>
        <p>
            Gardez l'option "Annonces" activer pour recevoir les annonces des quêtes et événements.
        </p>
    </SectionBlock>
    <SectionBlock title="Questions / idées">
        <p>
            Si vous avez des questions ou des idées à nous faire parvenir, contactez nous sur discord ou par message
            privé voir même dans le tchat du clan.
        </p>
    </SectionBlock>
    <SectionBlock title="Attention">
        <p>
            Toutes les informations précédentes sont susceptible de changer d'une semaine à l'autre, pour être sûr
            d'avoir les bonnes informations :
            <br />
            Surveillez les messages et annonces du clan.
            <br />
            Regardez les informations dans la description du clan et dans les messages épinglés dans le tchat du clan.
        </p>
    </SectionBlock>
</template>
