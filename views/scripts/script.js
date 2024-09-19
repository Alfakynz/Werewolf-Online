// Copier du texte
function copyText(text) {
  var textToCopy = text;
  navigator.clipboard.writeText(textToCopy).then(function () {
    alert('Le texte ' + '"' + textToCopy + '"' + ' a été copié!');
  })
}

/*-------------------------------------*/
// Reveal au scroll
function revealElement(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains('fade-in')) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target); // Arrêter d'observer une fois l'animation activée
    }
  });
}

const elementsToAnimate = document.querySelectorAll('.reveal');

// Options pour l'observateur
const options = {
  root: null, // La racine par défaut est la fenêtre visible
  threshold: 0.4, // Le seuil de visibilité
};

// Créer un nouvel observateur pour chaque élément
elementsToAnimate.forEach((element) => {
  const observer = new IntersectionObserver(revealElement, options);
  observer.observe(element);
});

/*-------------------------------------*/
// Fonction pour obtenir l'option sélectionnée d'une liste de radio
function getSelectedOption(radioName) {
  var radios = document.getElementsByName(radioName);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return null;
}

/*-------------------------------------*/
// Copier l'annonce avec les réponses sélectionnées
function copyAnnonce() {
  //var form = document.getElementById("form");
  var infoForm = {};
  infoForm.number = getSelectedOption("numberQuest");
  infoForm.type = getSelectedOption("typeQuest");
  infoForm.date = document.getElementById('date').value;

  var dataQuest = infoForm.date[8] + infoForm.date[9] + infoForm.date[7] + infoForm.date[5] + infoForm.date[6] + infoForm.date[4] + infoForm.date[0] + infoForm.date[1] + infoForm.date[2] + infoForm.date[3]

  var annonceToCopy = '🏆PROCHAINE QUÊTE🏆' + dataQuest + ' à 20h\nOn fera la quête ' + infoForm.number + '\nPour participer donnez ' + infoForm.type + ' au clan.';

  navigator.clipboard.writeText(annonceToCopy).then(function () {
    alert('Le texte ' + '\n\n' + annonceToCopy + '\n\n' + ' a été copié!');
  });
}
