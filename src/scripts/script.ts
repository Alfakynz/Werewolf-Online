// Copier du texte
export function copyText(text: string): void {
	navigator.clipboard.writeText(text).then(() => {
		alert(`Le texte "${text}" a été copié!`)
	})
}

/*-------------------------------------*/
// Fonction pour obtenir l'option sélectionnée d'une liste de radio
export function getSelectedOption(radioName: string): string | null {
	const radios = document.getElementsByName(radioName) as NodeListOf<HTMLInputElement>
	for (let i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			return radios[i].value
		}
	}
	return null
}

/*-------------------------------------*/
// Copier l'annonce avec les réponses sélectionnées
interface InfoForm {
	number: string | null
	type: string | null
	date: string
}

export function copyAnnonce(): void {
	const dateInput = document.getElementById('date') as HTMLInputElement | null
	if (!dateInput) return

	const infoForm: InfoForm = {
		number: getSelectedOption('numberQuest'),
		type: getSelectedOption('typeQuest'),
		date: dateInput.value,
	}

	const d = infoForm.date
	const dataQuest = d[8] + d[9] + d[7] + d[5] + d[6] + d[4] + d[0] + d[1] + d[2] + d[3]

	const annonceToCopy =
		'🏆PROCHAINE QUÊTE🏆' +
		dataQuest +
		' à 20h\n' +
		'On fera la quête ' +
		infoForm.number +
		'\n' +
		'Pour participer donnez ' +
		infoForm.type +
		' au clan.'

	navigator.clipboard.writeText(annonceToCopy).then(() => {
		alert('Le texte ' + '\n\n' + annonceToCopy + '\n\n' + ' a été copié!')
	})
}

export function copyQuestGold(
	players: { username: string; goldQuest: number; gemQuest: number }[],
): void {
	// Trie les joueurs en fonction du nombre de quêtes dans l'ordre décroissant
	players.sort(function (a, b) {
		return b.goldQuest - a.goldQuest
	})

	var questGoldToCopy = 'Quête or gratuite: '
	var firstMemberWithGold = true // Utilisé pour ne pas ajouter de virgule avant le premier membre

	for (let i = 0; i < players.length; i++) {
		if (players[i].goldQuest >= 1) {
			if (!firstMemberWithGold) {
				questGoldToCopy += ', ' // Ajoute une virgule seulement si ce n'est pas le premier membre avec de l'or
			} else {
				firstMemberWithGold = false // Indique que le premier membre a été trouvé
			}
			questGoldToCopy += players[i].username + ' x' + players[i].goldQuest
		}
	}

	navigator.clipboard.writeText(questGoldToCopy).then(function () {
		alert('Le texte ' + '\n\n' + questGoldToCopy + '\n\n' + ' a été copié!')
	})
}

/*-------------------------*/
export function copyQuestGem(
	players: { username: string; goldQuest: number; gemQuest: number }[],
): void {
	var questGemToCopy = 'Quête gemme gratuite: '
	var firstMemberWithGem = true

	for (let i = 0; i < players.length; i++) {
		if (players[i].gemQuest >= 1) {
			if (!firstMemberWithGem) {
				questGemToCopy += ', '
			} else {
				firstMemberWithGem = false
			}
			questGemToCopy += players[i].username + ' x' + players[i].gemQuest
		}
	}
	var questGoldToGemToCopy = '\nPouvant échanger 5 quêtes or gratuite contre 1 quête gemme: '
	var firstMemberWithGoldToGem = true

	for (let i = 0; i < players.length; i++) {
		if (players[i].goldQuest >= 5) {
			if (!firstMemberWithGoldToGem) {
				questGoldToGemToCopy += ', '
			} else {
				firstMemberWithGoldToGem = false
			}
			questGoldToGemToCopy += players[i].username + ' x' + players[i].goldQuest
		}
	}
	questGemToCopy += questGoldToGemToCopy
	navigator.clipboard.writeText(questGemToCopy).then(function () {
		alert('Le texte ' + '\n\n' + questGemToCopy + '\n\n' + ' a été copié!')
	})
}
