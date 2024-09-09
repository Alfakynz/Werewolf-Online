const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const { setDoc, getDoc, getDocs, collection, updateDoc, deleteDoc, doc, writeBatch, query, where } = require('firebase/firestore');
const { db, users } = require('../firebaseConfig.js');
require('dotenv').config();

//Appel du bot lorsqu'on execute ce ficher
const bot = require('../bot.js');
bot.start();

const apiFire = process.env['APIFIRE'];
const apiVal = process.env['APIVAL'];
const response1 = process.env['Question1'];
const response2 = process.env['Question2'];
const response3 = process.env['Question3'];
const response3bis = process.env['Question3bis'];
const response4 = process.env['Question4'];
const response5 = process.env['Question5'];
const response6 = process.env['Question6'];
const response7 = process.env['Question7'];
const response8 = process.env['Question8'];
const response9 = process.env['Question9'];
const response10 = process.env['Question10'];
const response11 = process.env['Question11'];
const response12 = process.env['Question12'];
const response13 = process.env['Question13'];
const response14 = process.env['Question14'];
const response15 = process.env['Question15'];
const responses = [response1, response2, response3, response4, response5, response6, response7, response8, response9, response10, response11, response12, response13, response14, response15];

const accessTokenFire = apiFire;
const accessTokenVal = apiVal;

app.use(session({
  secret: 'votre-secret-de-session',
  resave: false,
  saveUninitialized: true,
}));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

const clanId = "28f85d51-37b1-4fc6-a938-47656353363c";
const clanIdAPI = "2353e8b6-76a3-4d9a-92ae-62848e9d476a";
const playerId = "1d614485-0d87-4724-834a-33e8b26dce47"; // Id de Soline
const namePlayer = "ninaa_";
const nameClan = "APIclan"; // WerewoIf OnIine*
//const slotNumber = "1";

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bot ${accessTokenFire}`
}
const headersVal = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bot ${accessTokenVal}`
}

const clan = `clans/${clanId}/info`;
const roles = "roles";
const items = {
  avatarItems: "items/avatarItems",
  avatarItemSets: "items/avatarItemSets",
  avatarItemCollections: "items/avatarItemCollections",
  profileIcons: "items/profileIcons",
  emojis: "items/emojis",
  emojiCollections: "items/emojiCollections",
  backgrounds: "items/backgrounds",
  loadingScreens: "items/loadingScreens",
  roleIcons: "items/roleIcons",
  advancedRoleCardOffers: "items/advancedRoleCardOffers",
  roses: "items/roses",
  talismans: "items/talismans"
}
//const sharedAvatarId = `sharedAvatarId/${playerId}/${slotNumber}`;
//const avatars = `avatars/${sharedAvatarId}`;
const roleRotation = "roleRotation";
const battlePass = {
  season: "battlePass/season",
  challenges: "battlePass/challenges"
}
const shop = {
  activeOffers: "shop/activeOffers",
}
const players = {
  playerId: `players/${playerId}`,
  searchUsername: `players/search?username=${namePlayer}`,
}
const clans = {
  searchName: `clans/search?name=${nameClan}`,
  info: `clans/${clanId}/info`,
}

// Référence à la base de données des joueurs
const playersRef = collection(db, 'players');

// Supprimer tous les joueurs de la base de données
function removeAll() {
  getDocs(playersRef)
    .then(snapshot => {
      const batch = writeBatch(db);
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    })
    .then(() => {
      console.log('Tous les joueurs ont été supprimés.');
    })
    .catch(error => {
      console.error('Erreur lors de la suppression des joueurs :', error);
    });
}

// Ajouter tous les joueurs à la base de données en ajoutant ceux qui n'y sont pas et retirant ceux qui n'y sont plus
function addAllMembers() {
  axios.get(`https://api.wolvesville.com/clans/${clanId}/members`, {
    headers: headers
  })
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Request failed.');
      }
    })
    .then(responseData => {
      const playersRef = collection(db, 'players');

      return getDocs(playersRef).then(snapshot => {
        let existingPlayers = {};
        snapshot.forEach(doc => {
          existingPlayers[doc.id] = doc.data();
        });

        let apiPlayerIds = new Set(responseData.map(player => player.playerId));
        const batch = writeBatch(db);

        // Ajouter ou mettre à jour les joueurs dans Firestore
        responseData.forEach(player => {
          if (!existingPlayers[player.playerId]) {
            const newPlayer = {
              username: player.username,
              playerId: player.playerId,
              gemQuest: 0,
              goldQuest: 0,
              numberTryTest: 0
            };
            batch.set(doc(playersRef, player.playerId), newPlayer);
          }
        });

        // Supprimer les joueurs qui ne sont plus dans la réponse API
        Object.keys(existingPlayers).forEach(playerId => {
          if (!apiPlayerIds.has(playerId)) {
            batch.delete(doc(playersRef, playerId));
          }
        });

        return batch.commit();
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//removeAll();
addAllMembers();

// Modifier le nombre de quête gratuite d'un joueur
async function updateQuest(username, questType, amount) {
  try {
    // Rechercher les joueurs avec le nom d'utilisateur correspondant
    const querySnapshot = await getDocs(query(playersRef, where("username", "==", username)));

    if (querySnapshot.empty) {
      throw new Error('Joueur non trouvé.');
    }

    // S'assurer que questType est valide
    if (!['goldQuest', 'gemQuest'].includes(questType)) {
      throw new Error('Type de quête invalide. Utilisez "goldQuest" ou "gemQuest".');
    }

    // Mettre à jour la valeur de la quête pour chaque document trouvé
    querySnapshot.forEach(async (docSnapshot) => {
      const playerRef = docSnapshot.ref;
      await updateDoc(playerRef, {
        [questType]: amount
      });
    });

    console.log(`La quête ${questType} de ${username} a été mise à jour avec ${amount}.`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la quête :', error);
  }
}

app.get('/', (req, res) => {
  let srcImg = "images/enattente.jpeg";
  let participantsData = [];
  let date = "Aucune quête en cours.";
  let srcImgNext = "images/enattente.jpeg";
  let nextParticipants = [];
  let dayNextQuest = "";
  let currency = ['or', 'https://www.wolvesville.com/static/media/silver_coin.7b12538367a6d2cfa2c0.png'];
  let actualQuestId = "";

  // Requête pour les quêtes actives
  axios.get(`https://api.wolvesville.com/clans/${clanId}/quests/active`, {
    headers: headers
  }).then(response => {
    const responseData = response.data;
    const selectedInfo = {
      "url": responseData.quest.promoImageUrl,
      "tierStartTime": responseData.tierStartTime
    };
    actualQuestId = responseData.quest.id;
    const nouvelleExtension = "@3x.jpg";
    srcImg = selectedInfo.url.replace(".jpg", nouvelleExtension);
    const tierStartTimeData = selectedInfo.tierStartTime;
    let [year, month, day, time] = tierStartTimeData.split(/[-T:.Z]/);
    time = Number(time) + 1;
    date = "La quête a démarré le " + day + "/" + month + "/" + year + " à " + time + "h";
    // Liste des participants
    participantsData = responseData.participants.map(participant => ({
      username: participant.username,
      xp: participant.xp
    }));

    // Tri des participants par XP dans l'ordre décroissant
    participantsData.sort((a, b) => b.xp - a.xp);
  }).catch(error => {
    console.log("Une erreur s'est produite lors de la requête pour les quêtes actives.");

  }).then(() => {
    // Requête pour les annonces
    return axios.get(`https://api.wolvesville.com/clans/${clanId}/announcements`, {
      headers: headers
    });
  }).then(response => {
    const responseData = response.data;
    let count = 0;
    const regex = /quête (\d+)/;
    let isQuestInAnnounce = false;

    while (!isQuestInAnnounce && count < responseData.length) {
      const matches = responseData[count].content.toLowerCase().match(regex);

      // Vérification si la correspondance a été trouvée
      if (matches) {
        // Le nombre après "quête" est dans le groupe de capture (matches[1])
        const numberNextQuest = parseInt(matches[1], 10);
        const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
        dayNextQuest = null;

        for (const day in days) {
          if (responseData[count].content.toLowerCase().includes(days[day])) {
            dayNextQuest = days[day];
            break;
          }
        }
        isQuestInAnnounce = true;

        return axios.get(`https://api.wolvesville.com/clans/${clanId}/quests/available`, {
          headers: headers
        }).then(response => {
          const responseData = response.data;
          const questAvailable = responseData[numberNextQuest - 1];
          if (questAvailable.id != actualQuestId) {
            const nextQuestImg = questAvailable.promoImageUrl;
            const purchasableWithGems = questAvailable.purchasableWithGems;
            currency = purchasableWithGems ? ['gem', 'https://cdn.wolvesville.com/challenges/icons/challenge-gems@2x.png'] : ['or', 'https://www.wolvesville.com/static/media/silver_coin.7b12538367a6d2cfa2c0.png'];
            const nouvelleExtension = "@3x.jpg";
            srcImgNext = nextQuestImg.replace(".jpg", nouvelleExtension);

          }

          return axios.get(`https://api.wolvesville.com/clans/${clanId}/members`, {
            headers: headers
          });
        }).then(response => {
          const responseData = response.data;
          nextParticipants = [];

          for (let i = 0; i < responseData.length; i++) {
            if (responseData[i].participateInClanQuests) {
              nextParticipants.push(responseData[i].username);
            }
          }
          res.render('index', {
            srcImg: srcImg,
            participantsData: participantsData,
            date: date,
            srcImgNext: srcImgNext,
            nextParticipants: nextParticipants,
            dayNextQuest: dayNextQuest,
            currency: currency
          });
        }).catch(error => {
          console.log("Une erreur s'est produite lors de la requête pour les quêtes disponibles.");
          console.error(error);
          res.render('index', {
            srcImg: srcImg,
            participantsData: participantsData,
            date: date,
            srcImgNext: srcImgNext,
            nextParticipants: nextParticipants,
            dayNextQuest: dayNextQuest,
            currency: currency
          });
        });
      } else {
        count++;
      }
    }

    // Si aucune quête n'est trouvée dans les annonces
    if (!isQuestInAnnounce) {
      console.log("Aucune quête n'a été trouvée dans les annonces.");
      res.render('index', {
        srcImg: srcImg,
        participantsData: participantsData,
        date: date,
        srcImgNext: srcImgNext,
        nextParticipants: nextParticipants,
        dayNextQuest: dayNextQuest,
        currency: currency
      });
    }
  }).catch(error => {
    console.log("Une erreur s'est produite lors de la requête pour les annonces.");
    console.error(error);
    res.render('index', {
      srcImg: srcImg,
      participantsData: participantsData,
      date: date,
      srcImgNext: srcImgNext,
      nextParticipants: nextParticipants,
      dayNextQuest: dayNextQuest,
      currency: currency
    });
  });
});

app.get('/annonce', async (req, res) => {
  const playersRef = collection(db, 'players');

  try {
    const snapshot = await getDocs(playersRef);

    if (!snapshot.empty) {
      const players = snapshot.docs ? snapshot.docs.map(doc => doc.data()) : [];
      res.render('annonce', { players });
    } else {
      console.log("No data available");
      res.render('annonce', { players: [] });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs :', error);
    res.render('annonce', { players: [] });
  }
});

app.get('/events', (req, res) => {
  res.render('events');
});

app.get('/informations', (req, res) => {
  res.render('informations');
});

app.get('/items', (req, res) => {
  res.render('items');
});

app.get('/questionnaire', (req, res) => {
  res.render('questionnaire', { pseudo: false });
});

app.get('/quete', async (req, res) => {
  try {
    const response = await axios.get(`https://api.wolvesville.com/clans/${clanId}/quests/history`, {
      headers: headers
    });

    const responseData = response.data;
    const lastQuest = responseData[0];
    const questTime = lastQuest.tierStartTime;

    // Utilisation d'un ID fixe pour le document dans la collection "quests"
    const questDocRef = doc(db, 'quests', 'currentQuest');
    const questDocSnapshot = await getDoc(questDocRef);

    if (!questDocSnapshot.exists() || questTime !== questDocSnapshot.data().questTime) {
      // Mettre à jour le temps de la quête dans Firestore
      await setDoc(questDocRef, { questTime: questTime });

      const questParticipants = lastQuest.participants;

      for (let i = 0; i < questParticipants.length; i++) {
        const username = questParticipants[i].username;
        const xp = questParticipants[i].xp;
        const goldQuest = Math.floor(xp / 8000);

        const playerQuery = query(playersRef, where('username', '==', username));
        const playerSnapshot = await getDocs(playerQuery);

        if (!playerSnapshot.empty) {
          const playerDoc = playerSnapshot.docs[0];
          const playerData = playerDoc.data();
          const newGoldQuest = playerData.goldQuest + goldQuest;

          // Mettre à jour le joueur dans Firestore
          await updateDoc(playerDoc.ref, { goldQuest: newGoldQuest });
        }
      }
    }

    // Récupérer tous les joueurs pour l'affichage
    const playersSnapshot = await getDocs(playersRef);
    const playersArray = playersSnapshot.docs.map(doc => doc.data());

    res.render("quete", { players: playersArray });
  } catch (error) {
    console.log("An error occurred:", error);
    res.status(500).send("An error occurred while processing the quest.");
  }
});

app.get('/recompenses', (req, res) => {
  res.render('recompenses');
});

app.get('/regles', (req, res) => {
  res.render('regles');
});

app.post('/questionnaire', async (req, res) => {
  const {
    question1, question2, question3, question4, question5,
    question6, question7, question8, question9, question10,
    question11, question12, question13, question14, question15,
    pseudo
  } = req.body;

  const questions = [
    question1, question2, question3, question4, question5,
    question6, question7, question8, question9, question10,
    question11, question12, question13, question14, question15
  ];

  try {
    // Récupérer les membres du clan
    const response = await axios.get(`https://api.wolvesville.com/clans/${clanId}/members`, {
      headers: headers
    });

    if (response.status !== 200) {
      throw new Error('Request failed.');
    }

    const responseData = response.data;
    const isPseudoInClan = responseData.some(member => member.username === pseudo);

    if (isPseudoInClan) {
      let playerID = responseData.find(member => member.username === pseudo).playerId;
      let wrongAnswers = [];
      let correctAnswers = 0;
      let messageToClan = `${pseudo} : `;

      for (let i = 0; i < questions.length; i++) {
        if (questions[i] !== responses[i]) {
          if (questions[i] !== response3bis) {
            wrongAnswers.push({
              question: questions[i],
              isCorrect: false,
              class: "red"
            });
            messageToClan += `Q${i + 1} incorrecte. `;
          } else {
            correctAnswers++;
            wrongAnswers.push({
              question: questions[i],
              isCorrect: true,
              class: "green"
            });
            messageToClan += `Q${i + 1} correcte. `;
          }
        } else {
          correctAnswers++;
          wrongAnswers.push({
            question: questions[i],
            isCorrect: true,
            class: "green"
          });
          messageToClan += `Q${i + 1} correcte. `;
        }
      }

      messageToClan += `${correctAnswers}/15`;

      // Envoyer le message au clan via l'API Wolvesville
      await fetch(`https://api.wolvesville.com/clans/${clanIdAPI}/chat`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "message": messageToClan })
      });

      // Enregistrer les résultats du questionnaire dans Firestore
      const playerIdRef = doc(db, 'players', playerID);

      // Récupérer les données actuelles du joueur
      const playerDoc = await getDoc(playerIdRef);
      if (playerDoc.exists()) {
        const playerData = playerDoc.data();

        if (playerData.numberTryTest < 3) {
          await setDoc(playerIdRef, { numberTryTest: playerData.numberTryTest + 1 }, { merge: true });
        }
        else {
          res.status(500).send('Vous avez déjà participer 3 fois au questionnaire.');
        }
      }

      // Enregistrer les résultats du questionnaire dans Firestore
      await setDoc(playerIdRef, { correctAnswers, wrongAnswers }, { merge: true });

      res.render('note', { correctAnswers: correctAnswers, pseudo: pseudo });

    } else {
      res.render('questionnaire', { pseudo: pseudo });
    }

  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).send('Une erreur est survenue lors du traitement du questionnaire.');
  }
});

app.get('/search', (req, res) => {
  res.render('search', { player: false, srcImg: "", bio: "", dateCompte: "", dateOnline: "" });
});

app.post('/search', (req, res) => {
  const username = req.body;
  axios.get(`https://api.wolvesville.com/players/search?username=${username.username}`, {
    headers: headers,
    params: {
      username: username
    }
  }).then(response => {
    const responseData = response.data;
    const nouvelleExtension = "@3x.png";
    const srcImg = responseData.equippedAvatar.url.replace(".png", nouvelleExtension);
    const personalMsg = responseData.personalMessage;
    const bio = personalMsg.split("\n");
    let [yearCompte, monthCompte, dayCompte, timeCompte] = responseData.creationTime.split(/[-T:.Z]/);
    timeCompte = Number(timeCompte) + 1;
    const dateCompte = dayCompte + "/" + monthCompte + "/" + yearCompte + " à " + timeCompte + "h";
    let [yearOnline, monthOnline, dayOnline, timeOnline] = responseData.lastOnline.split(/[-T:.Z]/);
    timeOnline = Number(timeOnline) + 1;
    const dateOnline = dayOnline + "/" + monthOnline + "/" + yearOnline + " à " + timeOnline + "h";
    res.render('search', { player: responseData, srcImg: srcImg, bio: bio, dateCompte: dateCompte, dateOnline: dateOnline });
  }).catch(error => {
    res.render('search', { player: false, srcImg: "", bio: "Joueur non trouvé (" + username.username + ")", dateCompte: "", dateOnline: "" });
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}\n`);
});
