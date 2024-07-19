function getSelectedOption(radioGroup) {
  for (var i = 0; i < radioGroup.length; i++) {
    if (radioGroup[i].checked) {
      return radioGroup[i].value;
    }
  }
  return null;
}

function copyTextForm(event) {
  // Empêcher le refresh de la page
  event.preventDefault();
  // Récupérer les éléments de l'id myForm
  var form = document.getElementById("myForm");
  var responses = {};

  // Récupérer les réponses pour chaque question
  responses.question1 = getSelectedOption(form.question1);
  responses.question2 = getSelectedOption(form.question2);
  responses.question3 = getSelectedOption(form.question3);
  responses.question4 = getSelectedOption(form.question4);
  responses.question5 = getSelectedOption(form.question5);
  responses.question6 = getSelectedOption(form.question6);
  responses.question7 = getSelectedOption(form.question7);
  responses.question8 = getSelectedOption(form.question8);
  responses.question9 = getSelectedOption(form.question9);
  responses.question10 = getSelectedOption(form.question10);
  responses.question11 = getSelectedOption(form.question11);
  responses.question12 = getSelectedOption(form.question12);
  responses.question13 = getSelectedOption(form.question13);
  responses.question14 = getSelectedOption(form.question14);
  responses.question15 = getSelectedOption(form.question15);
  //responses.pseudo = document.getElementById("pseudo").value;

  // Ajoutez d'autres questions ici en suivant le même modèle

  if (responses.question1 === null || responses.question2 === null || responses.question3 === null || responses.question4 === null || responses.question5 === null || responses.question6 === null || responses.question7 === null || responses.question8 === null || responses.question9 === null || responses.question10 === null || responses.question11 === null || responses.question12 === null || responses.question13 === null || responses.question14 === null || responses.question15 === null/* || responses.pseudo === ""*/) {
    alert("Vous n'avez pas rempli toutes les questions.\nVeuillez répondre aux questions avant de copier le texte.")
  }
  else {
    // Construire le contenu de la copie
    var copyText = "Réponses au questionnaire bonus :\n\n";
    for (var question in responses) {
      copyText += question + ": " + responses[question] + "\n";
    }
    // Script pour copier les réponses
    navigator.clipboard.writeText(copyText).then(function() {
    alert('Le texte \n' + '"' + copyText + '"' + '\na été copié!');
  })
  }
}
