function start() {

  const { Client, GatewayIntentBits } = require("discord.js");
  const axios = require('axios');
  //const { ReadableStream } = ('web-streams-polyfill');  

  const accessToken = process.env['APIFIRE'];
  const botKey = process.env['BOT_KEY'];

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
  });


  const clanId = "28f85d51-37b1-4fc6-a938-47656353363c"
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bot ${accessToken}` // Headers de l'api
  }


  client.on("ready", () => {
    console.log("Bot opérationnel");
  });
  client.login(`Bot ${botKey}`); // Code du bot discord
  client.on("messageCreate", message => {
    //console.log(message); // ne mettre que si on veut tout les details du messages c'est plus lisible sans
    console.log(`Message de ${message.author.tag}: "${message.content}"`);
    // Désactive le bot si Firelack le demande
    if (message.content === "!desactiver" && message.author.tag === "firelack") {
      console.log('Désactivation du bot.');
      client.user.setPresence({ status: 'invisible' });
      client.destroy();
    }

    // Vérifier que le message n'a pas été envoyé par le bot lui-même
    if (message.author.id === client.user.id) {
      return; // Ne pas traiter les messages du bot
    }
    // Si quelqu'un tag le bot xD
    if (message.content.includes(`<@1165928098219433995>`) || message.mentions.users.has('1165928098219433995')) {
      message.reply("Pourquoi tu me tag, achète-toi une vie");
    }

    // Plein de truc fun
    if (message.content.toLowerCase().includes("mdrrrrrrrrrrr") || message.content.toLowerCase().includes("ptdrrrrrrrrrrr")) {
      message.reply("Peut être c'est excessif (chaud t'es tombé(e) pile sur le bon nombre de r)");
    }
    if (message.content.toLowerCase().includes("i love you") || message.content.toLowerCase().includes("i love u")) {
      message.reply("Me too 💘");
    }
    if (message.content.toLowerCase().includes("je t'aime") || message.content.toLowerCase().includes("je t aime")) {
      message.reply("Moi aussi 💘");
    }
    if (message.content.toLowerCase().includes("ah")) {
      message.reply("BH (je suis trop drôle rigole 🔫)");
    }
    if (message.content.toLowerCase().includes(";-;")) {
      message.reply("SOURIS UN PEU !");
    }
    if (message.content.toLowerCase().includes("mouton") || message.content.toLowerCase().includes("🐑") || message.content.toLowerCase().includes("sheep")) {
      message.reply("Si il est sur une roue faites le cramer");
    }

    // Liste des commandes avec !helpme
    if (message.content.toLowerCase() === "!helpme") {
      message.reply("# Commandes disponibles :\n\n**__Informations d'un joueur:__**\n- Profil:{nom du joueur}\n- Actualavatar:{nom du joueur}\n- Avatar:{nom du joueur}\n- Avatar:{nom du joueur} {slot}\n- Cartes:{nom du joueur}\n- Stats:{nom du joueur}\n\n**__Infomations sur un clan:__**\n- Clan:{nom du clan}\n- Membersclan:{nom du clan}\n\n**__Informations sur un rôle:__**\n- Role:{nom du role}\n- Advanced:{nom du role}\n\n**__Avatars code:__**\n- Idavatar:{id de l'avatar}\n- Searchid:{nom du joueur} {numéro de slot}\n\n**__Informations du clan WerewoIf OnIine*:__**\n- Actualquest\n- Quest\n- Annonce\n\n**__Offres actives du shop:__**\n- Offres\n\n**__Challenges actif du battlepass:__**\n- Battlepass\n\n**__Rôles en jeu:__ (rapide, sérieuse, sandbox, silver et gold)**\n- Rolerotations:{mode de jeu}\n\n**__Spécial:__** Si vous posséder un bot sur wov et que vous voulez le chapeau de l'API (veuillez réinitialiser votre clé API après cette commande pour plus de sécurité)\n- Apichapeau:{votre clé api}\n\n**__PS:__** Les noms des rôles sont en anglais et avec - à la place des espaces, les pseudos ou noms de clan sont à écrire correctement\n\n|| **__PS bis:__** Il y a des réponses du bot lorsque vous dites certaines choses, à vous de découvrir les easters eggs ||");
    }

    // Avoir le chapeau api
    if (message.content.toLowerCase().startsWith("apichapeau:")) {
      // Récupérer la clé utilisateur à partir du message
      var userKey = message.content.substring(11).trim();

      // Mettre à jour les options de la deuxième requête avec la clé utilisateur
      var options = {
        'method': 'POST',
        'url': 'https://api.wolvesville.com/items/redeemApiHat',
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bot ${userKey}` // Utiliser la clé utilisateur comme clé de bot
        }
      };

      // Effectuer la deuxième requête
      axios(options)
        .then(response => {
          console.log(response.data);
          message.reply("La requête a été effectuée, allez vérifier dans votre inventaire et veuillez réinitialiser votre clé API pour plus de sécurité.");
        })
        .catch(error => {
          console.error(error);
          message.reply("Une erreur s'est produite lors de la requête.");
        });
    }

    //recuperer id correspondant a un  avatar 
    if (message.content.toLowerCase().startsWith("searchid:")) {
      // Extraire le nom du joueur et le numéro de slot
      const contentArray = message.content.substring(9).trim().split(" ");

      // Assurer qu'il y a au moins un élément après "searchid:"
      if (contentArray.length > 0) {
        const profilName = contentArray[0];

        // Vérifier si un numéro de slot est fourni
        const slotNumber = contentArray.length > 1 ? contentArray[1] : null;

        // Déclarer resp en dehors de la portée de la deuxième requête Axios
        let avatarUrl;
        let resp;

        axios.get(`https://api.wolvesville.com/players/search?username=${profilName}`, {
          headers: headers
        })
          .then(response => {
            const responseData = response.data;
            const selectedInfo = {
              "id": responseData.id,
              "username": responseData.username,
              "avatar": responseData.avatars[slotNumber].url
            };
            const nouvelleExtension = "@3x.png";
            avatarUrl = selectedInfo.avatar.replace(".png", nouvelleExtension);

            // Retourner la promesse de la deuxième requête Axios
            return axios.get(`https://api.wolvesville.com/avatars/sharedAvatarId/${responseData.id}/${slotNumber}`, {
              headers: headers
            });
          })
          .then(response => {
            resp = response.data;
            // Répondre ici après que les deux requêtes aient réussi
            message.reply(`**__Avatar demandé:__** [Avatar](${avatarUrl})\n**__Avatar id:__** ${resp}`);
          })
          .catch(error => {
            message.reply("Une erreur s'est produite lors de la requête.");
            console.error(error);
          });
      } else {
        // Gérer le cas où aucun nom de joueur n'est fourni
        console.log("Aucun nom de joueur fourni après 'searchid:'");
      }
    }

    // Récupérer l'avatar correspondant a un id
    if (message.content.toLowerCase().startsWith("idavatar:")) {
      var sharedAvatarId = message.content.substring(9).trim();

      axios.get(`https://api.wolvesville.com/avatars/${sharedAvatarId}`, {
        headers: headers
      })
        .then(response => {
          const data = response.data;
          const selectedInfo = {
            "id": data.id, // Utiliser data.id au lieu de response.id
            "url": data.avatar.url // Utiliser data.avatar.url au lieu de reponse.avatar.url
          };

          const nouvelleExtension = "@3x.png";
          const newurl = selectedInfo.url.replace(".png", nouvelleExtension);

          message.reply(`**__Id du skin:__** ${selectedInfo.id}:\n**__Avatar correspondant:__** [lien](${newurl})`);
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Rôle Rotations
    if (message.content.toLowerCase().startsWith("rolerotations:")) {
      // Extraire le mode de jeu de la commande
      let gameModeInput = message.content.substring("rolerotations:".length).trim().toLowerCase();
      let gameMode;

      // Mapping for custom inputs
      const customInputsMapping = {
        rapide: "quick",
        sérieuse: "advanced",
        gold: "ranked-league-gold",
        silver: "ranked-league-silver",
      };

      // Check if the custom input is mapped
      if (customInputsMapping.hasOwnProperty(gameModeInput)) {
        gameMode = customInputsMapping[gameModeInput];
      } else {
        // If not a custom input, use the provided input as is
        gameMode = gameModeInput;
      }

      // Vérifier si le mode de jeu est valide
      const validGameModes = ["ranked-league-silver", "ranked-league-gold", "sandbox", "advanced", "quick"];
      if (validGameModes.includes(gameMode)) {
        // Effectuer une requête pour obtenir les rotations de rôles pour le mode de jeu spécifié
        axios.get(`https://api.wolvesville.com/roleRotations`, {
          headers: headers
        })
          .then(response => {
            const roleRotations = response.data;

            // Rechercher les rotations de rôles pour le mode de jeu spécifié
            const selectedRotation = roleRotations.find(rotation => rotation.gameMode === gameMode);

            if (selectedRotation) {
              const rolesInfo = selectedRotation.roleRotations.map(roleInfo => {
                const roles = roleInfo.roleRotation.roles.map(role => {
                  return Array.isArray(role) ? role[0].role : role.role;
                }).join(", ");
                return `**__Probabilité:__ ${roleInfo.probability}**\n${roles}`;
              }).join("\n");

              message.reply(`**Mode de jeu: ${gameMode}**\n${rolesInfo}`);
            } else {
              message.reply("Aucune rotation de rôle trouvée pour le mode de jeu spécifié.");
            }
          })
          .catch(error => {
            message.reply("Une erreur s'est produite lors de la requête.");
            console.error(error);
          });
      } else {
        message.reply("Mode de jeu invalide. Les modes valides sont: ranked-league-silver, ranked-league-gold, sandbox, advanced, quick (ou rapide, sérieuse, silver et gold).");
      }
    }

    // Challenge actif du battle pass
    if (message.content.toLowerCase().startsWith("battlepass")) {
      axios.get('https://api.wolvesville.com/battlePass/challenges', {
        headers: headers
      })
        .then(response => {
          const challenges = response.data;

          // Filtrer les challenges en cours
          const currentChallenges = challenges.filter(challenge => {
            const startTime = new Date(challenge.startTime).getTime();
            const endTime = startTime + challenge.durationInDays * 24 * 60 * 60 * 1000;
            const currentTime = new Date().getTime();
            return currentTime >= startTime && currentTime <= endTime;
          });

          // Construire la réponse avec les informations demandées
          const responseText = currentChallenges.map(challenge => {
            const startTime = new Date(challenge.startTime);
            const endTime = new Date(startTime.getTime() + challenge.durationInDays * 24 * 60 * 60 * 1000);
            const timeRemaining = endTime - new Date();

            // Formatage de la date en français
            const formattedStartDate = startTime.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            // Vérifier si le prix en or est défini
            const goldReward = challenge.rewardInGold !== undefined ? `**Récompense en or :** ${challenge.rewardInGold}` : '';

            // Construction de la réponse en excluant la catégorie "Récompense en or" si elle n'est pas définie
            return `**Description :** ${challenge.description}\n${goldReward ? goldReward + '\n' : ''}**Date de début :** ${formattedStartDate}\n**Durée restante :** ${Math.floor(timeRemaining / (24 * 60 * 60 * 1000))} jours`;
          }).join('\n\n');

          message.reply(responseText);
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Offre active du shop
    if (message.content.toLowerCase() === "offres") {
      axios.get("https://api.wolvesville.com/shop/activeOffers", {
        headers: headers,
      })
        .then(response => {
          const activeOffers = response.data;

          // Filtrer les offres avec une URL d'image non nulle
          const offersWithImage = activeOffers.filter(offer => offer.promoImageUrl);

          if (offersWithImage.length > 0) {
            offersWithImage.forEach(offer => {
              // Formatter la date en format français avec date et heure
              const formattedDate = new Intl.DateTimeFormat('fr-FR', {
                dateStyle: 'full',
                timeStyle: 'short',
              }).format(new Date(offer.expireDate));

              const imageUrl = offer.promoImageUrl.replace(".jpg", "@3x.jpg");

              let messageText = `Type: ${offer.type}\n`;
              messageText += `Date d'expiration: ${formattedDate}\n`;
              messageText += `Prix: ${offer.costInGems} gemmes\n`;
              messageText += `Image URL: [lien](${imageUrl})\n\n`;

              // Envoyer un message distinct pour chaque offre
              message.reply(`**__Offres actives:__**\n${messageText}`);
            });
          } else {
            message.reply("Pas d'offre active trouvée");
          }
        })
        .catch(error => {
          console.error("Error making the request:", error);
          message.reply("An error occurred while making the request.");
        });
    }

    // Récupérer les rôles avancés
    if (message.content.toLowerCase().startsWith("advanced:")) {
      var requestedRole = message.content.substring(9).trim();
      requestedRole = requestedRole.toLowerCase();

      axios.get(`https://api.wolvesville.com/roles`, {
        headers: headers
      })
        .then(response => {
          const data = response.data;
          if (data.advancedRolesMapping && data.advancedRolesMapping.hasOwnProperty(requestedRole)) {
            const mapping = data.advancedRolesMapping[requestedRole];
            const mappingEntries = Object.entries(mapping);

            const formattedResponse = mappingEntries.map(([key, value], index) => `> - ${value}`).join('\n');

            message.reply(`**__Mapping du rôle avancé "${requestedRole}":__**\n${formattedResponse}`);
          } else {
            message.reply(`Le rôle avancé de "${requestedRole}" n'a pas été trouvé.`);
          }
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Récupérer les informations d'un rôle
    if (message.content.toLowerCase().startsWith("role:") || message.content.toLowerCase().startsWith("rôle:")) {
      var roleName = message.content.substring(5).trim();
      roleName = roleName.toLowerCase();

      axios.get(`https://api.wolvesville.com/roles`, {
        headers: headers
      })
        .then(response => {
          const roles = response.data.roles;
          const selectedRole = roles.find(role => role.id === roleName);

          if (selectedRole) {
            const roleInfo = {
              "id": selectedRole.id,
              "name": selectedRole.name,
              "description": selectedRole.description,
              "image": selectedRole.image.url
            };

            message.reply(`## Informations sur le rôle:\n\n**__Nom:__** ${roleInfo.name}\n**__Description:__** ${roleInfo.description}\n**__Image:__** ${roleInfo.image}`);
          } else {
            message.reply(`Le rôle "${roleName}" n'a pas été trouvé.`);
          }
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Récupérer un profil de joueur
    if (message.content.toLowerCase().startsWith("profil:")) {
      const profilName = message.content.substring(7).trim();

      axios.get(`https://api.wolvesville.com/players/search?username=${profilName}`, {
        headers: headers
      })
        .then(response => {
          const responseData = response.data;
          const selectedInfo = {
            "id": responseData.id,
            "username": responseData.username,
            "personalMessage": responseData.personalMessage,
            "level": responseData.level,
            "status": responseData.status,
            "creationTime": responseData.creationTime,
            "lastOnline": responseData.lastOnline,
            "rankedSeasonSkill": responseData.rankedSeasonSkill,
            "rankedSeasonMaxSkill": responseData.rankedSeasonMaxSkill,
            "rankedSeasonBestRank": responseData.rankedSeasonBestRank,
            "rankedSeasonPlayedCount": responseData.rankedSeasonPlayedCount,
            "receivedRosesCount": responseData.receivedRosesCount,
            "sentRosesCount": responseData.sentRosesCount,
            "profileIconId": responseData.profileIconId,
            "profileIconColor": responseData.profileIconColor,
            "equippedAvatar": responseData.equippedAvatar.url
          };
          const nouvelleExtension = "@3x.png";
          const avatarUrl = selectedInfo.equippedAvatar.replace(".png", nouvelleExtension);

          message.reply(`# Profil de  ${selectedInfo.username}\n**__Level:__** ${selectedInfo.level}\n**__Description:__** \n\n${selectedInfo.personalMessage}\n\n**__Status:__** ${selectedInfo.status}\n**__Last Online:__** ${selectedInfo.lastOnline}\n**__Création du compte:__** ${selectedInfo.creationTime}\n**__Roses reçus:__** ${selectedInfo.receivedRosesCount}\n**__Roses envoyées:__** ${selectedInfo.sentRosesCount}\n**__Avatar équipé:__** [Avatar](${avatarUrl})`);
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Cartes d'un joueur
    if (message.content.toLowerCase().startsWith("cartes:")) {
      const profilName = message.content.substring(7).trim();

      axios.get(`https://api.wolvesville.com/players/search?username=${profilName}`, {
        headers: headers
      })
        .then(response => {
          const responseData = response.data;
          const selectedInfo = {
            "roleCards": responseData.roleCards,
            "username": responseData.username,
          };

          // Build a string representation of the role cards
          const roleCardsString = selectedInfo.roleCards.map(card => {
            let roleString = `**${card.roleId1}:** ${card.rarity}`;
            if (card.roleId2) {
              roleString += ` / **${card.roleId2}:** ${card.rarity}`;
            }
            return roleString;
          }).join('\n');

          message.reply(`# Cartes de ${selectedInfo.username}\n**__Cartes:__**\n${roleCardsString}`);
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Stats d'un joueur
    if (message.content.toLowerCase().startsWith("stats:")) {
      const profilName = message.content.substring(6).trim();

      axios.get(`https://api.wolvesville.com/players/search?username=${profilName}`, {
        headers: headers
      })
        .then(response => {
          const responseData = response.data;
          const gameStats = responseData.gameStats;
          const username = responseData.username;

          // Build a string representation of the game stats
          const gameStatsString = `**Statistiques de jeu pour ${username}:**\n` +
            `Parties gagnées: ${gameStats.totalWinCount}\n` +
            `Parties perdues: ${gameStats.totalLoseCount}\n` +
            `Parties égalées: ${gameStats.totalTieCount}\n` +
            `Parties en tant que Villageois gagnées: ${gameStats.villageWinCount}\n` +
            `Parties en tant que Villageois perdues: ${gameStats.villageLoseCount}\n` +
            `Parties en tant que Loup-Garou gagnées: ${gameStats.werewolfWinCount}\n` +
            `Parties en tant que Loup-Garou perdues: ${gameStats.werewolfLoseCount}\n` +
            `Parties de vote gagnées: ${gameStats.votingWinCount}\n` +
            `Parties de vote perdues: ${gameStats.votingLoseCount}\n` +
            `Parties solo gagnées: ${gameStats.soloWinCount}\n` +
            `Parties solo perdues: ${gameStats.soloLoseCount}\n` +
            `Nombre de suicides: ${gameStats.exitGameBySuicideCount}\n` +
            `Nombre de morts après la partie: ${gameStats.exitGameAfterDeathCount}\n` +
            `Temps total de jeu (en minutes): ${gameStats.totalPlayTimeInMinutes}`;

          message.reply(gameStatsString);
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Récupérer les infos d'un clan
    if (message.content.toLowerCase().startsWith("clan:")) {
      const clanName = message.content.substring(5).trim();

      axios.get(`https://api.wolvesville.com/clans/search?name=${clanName}`, {
        headers: headers
      })
        .then(response => {
          const responseData = response.data[0];
          const selectedInfo = {
            "creationTime": responseData.creationTime,
            "name": responseData.name,
            "description": responseData.description,
            "xp": responseData.xp,
            "language": responseData.language,
            "icon": responseData.icon,
            "iconColor": responseData.iconColor,
            "tag": responseData.tag,
            "joinType": responseData.joinType,
            "questHistoryCount": responseData.questHistoryCount,
            "minLevel": responseData.minLevel,
            "memberCount": responseData.memberCount,
          };

          message.reply(`# Name: ${selectedInfo.name}\n**__Date de Création:__** ${selectedInfo.creationTime}\n**__Description:__** \n\n${selectedInfo.description}\n\n**__Xp:__** ${selectedInfo.xp}\n**__Langage:__** ${selectedInfo.language}\n**__Tag:__** ${selectedInfo.tag}\n**__Rejoindre type:__** ${selectedInfo.joinType}\n**__Nombre de quête:__** ${selectedInfo.questHistoryCount}\n**__Level minimum:__** ${selectedInfo.minLevel}\n**__Nombre de membres:__** ${selectedInfo.memberCount}`);
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    };

    // Membres d'un clan
    if (message.content.toLowerCase().startsWith("membersclan:")) {
      const clanName = message.content.substring(12).trim();

      axios.get(`https://api.wolvesville.com/clans/search?name=${clanName}`, {
        headers: headers
      })
        .then(response => {
          const clanId = response.data[0].id; // Assurez-vous que le champ clanId est correctement défini dans la réponse de la première requête
          const batchSize = 10; // Nombre de membres par lot
          const totalMembers = response.data[0].memberCount; // Nombre total de membres dans le clan
          const numBatches = Math.ceil(totalMembers / batchSize);

          // Effectuez une requête par lot
          const batchRequests = Array.from({ length: numBatches }, (_, batchIndex) => {
            const offset = batchIndex * batchSize;
            return axios.get(`https://api.wolvesville.com/clans/${clanId}/members?limit=${batchSize}&offset=${offset}`, {
              headers: headers
            });
          });

          // Attendez toutes les requêtes en parallèle
          return Promise.all(batchRequests);
        })
        .then(batchResponses => {
          // Utilisez un ensemble pour suivre les membres déjà inclus
          const includedMembers = new Set();

          // Traitez les données des membres comme nécessaire
          const memberInfoArray = batchResponses.flatMap(batchResponse => {
            return batchResponse.data.map(member => {
              // Vérifiez si le membre a déjà été inclus
              if (!includedMembers.has(member.username)) {
                // Ajoutez le membre à l'ensemble pour éviter les duplications
                includedMembers.add(member.username);

                return {
                  "Username": member.username,
                  "XP": member.xp,
                };
              } else {
                return null; // Membre déjà inclus, renvoyer null pour l'ignorer
              }
            });
          });

          // Filtrez les membres nuls (déjà inclus) avant d'envoyer les messages
          const filteredMembers = memberInfoArray.filter(member => member !== null);

          // Envoyez les messages par lots de 10 membres
          for (let i = 0; i < filteredMembers.length; i += 10) {
            const currentBatch = filteredMembers.slice(i, i + 10);
            const formattedBatch = currentBatch.map(member => {
              return `- **__Username__**: ${member.Username} **__XP__**: ${member.XP}`;
            }).join('\n');
            message.reply(`Liste des membres du clan:\n${formattedBatch}`);
          }
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Annonce du clan werewolf online
    if (message.content.toLowerCase().startsWith("annonce")) {
      axios.get("https://api.wolvesville.com/clans/28f85d51-37b1-4fc6-a938-47656353363c/announcements", {
        headers: headers
      })
        .then(response => {
          const announcements = response.data;

          if (announcements.length > 0) {
            // Reverse the announcements array and format each announcement
            announcements.reverse().forEach((announcement, index) => {
              const timestamp = new Date(announcement.timestamp).toLocaleString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
              });
              const content = announcement.content;
              const author = announcement.author;

              message.reply(`**__Annonce ${announcements.length - index}__**\n**__Date__**: ${timestamp}\n**__Contenu__**:\n${content}\n**__Auteur__**: ${author}`);
            });
          } else {
            message.reply("Aucune annonce disponible pour le moment.");
          }
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Quête actuelle du clan werewolf online
    if (message.content.toLowerCase().startsWith("actualquest")) {
      axios.get(`https://api.wolvesville.com/clans/${clanId}/quests/active`, {
        headers: headers
      })
        .then(response => {
          const responseData = response.data;
          const selectedInfo = {
            "url": responseData.quest.promoImageUrl,
            "tierStartTime": responseData.tierStartTime,
          };
          const nouvelleExtension = "@3x.jpg";
          const newurl = selectedInfo.url.replace(".jpg", nouvelleExtension);

          // Extraire les composants de la date
          const [year, month, day, time] = selectedInfo.tierStartTime.split(/[-T:.Z]/);

          // Liste des participants
          const participants = responseData.participants.map(participant => {
            return {
              username: participant.username,
              xp: participant.xp
            };
          });

          // Tri des participants par XP dans l'ordre décroissant
          participants.sort((a, b) => b.xp - a.xp);

          message.reply(`**__Date de lancement:__** ${day}/${month}/${year} à ${time}h\n**__Participants:__**\n${participants.map(p => `- ${p.username}: ${p.xp} XP`).join('\n')}\n\n**__Image quête actuelle:__** [lien](${newurl})`);
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Quest disponible du clan werewolf online
    if (message.content.toLowerCase().startsWith("quest")) {
      axios.get(`https://api.wolvesville.com/clans/${clanId}/quests/available`, {
        headers: headers
      })
        .then(response => {
          const responseData = response.data;

          // Parcourir le tableau d'objets
          for (const quest of responseData) {
            // Récupérer les informations nécessaires
            const promoImageUrl = quest.promoImageUrl;
            const purchasableWithGems = quest.purchasableWithGems;
            const questId = quest.id;

            // Créer le nouveau URL
            const nouvelleExtension = "@3x.jpg";
            const newurl = promoImageUrl.replace(".jpg", nouvelleExtension);

            // Déterminer la devise pour l'achat
            const currency = purchasableWithGems ? "Gemmes" : "Or";

            axios.get(`https://api.wolvesville.com/clans/${clanId}/quests/votes`, {
              headers: headers,
              params: {
                questId: questId
              }
            })
              .then(response => {
                const responseData = response.data;
                const voteCount = responseData.votes[questId].length;

                // Envoyer le message avec les détails de la quête
                message.reply(`**__Type d'achat:__** ${currency}\n**__Nombre de votes:__** ${voteCount}\n**__Image quête actuelle:__** [lien](${newurl})`);
              })
              .catch(error => {
                message.reply("Une erreur s'est produite lors de la requête.");
                console.error(error);
              });
          }
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Avatar actuel d'un joueur
    if (message.content.toLowerCase().startsWith("actualavatar:")) {
      const profilName = message.content.substring(13).trim();

      axios.get(`https://api.wolvesville.com/players/search?username=${profilName}`, {
        headers: headers
      })
        .then(response => {
          const responseData = response.data;
          const selectedInfo = {
            "equippedAvatar": responseData.equippedAvatar.url,
            "username": responseData.username,
          };
          const nouvelleExtension = "@3x.png";
          const avatarUrl = selectedInfo.equippedAvatar.replace(".png", nouvelleExtension);

          message.reply(`**__Username:__** ${selectedInfo.username}\n**__Avatar actuel:__** [Lien de l'avatar](${avatarUrl})`);
        })
        .catch(error => {
          message.reply("Une erreur s'est produite lors de la requête.");
          console.error(error);
        });
    }

    // Tout les avatars ou un avatars en particulier d'un joueur
    if (message.content.toLowerCase().startsWith("avatar:")) {
      const profilNameWithNumber = message.content.substring(7).trim();

      // Utiliser une expression régulière pour vérifier si le message se termine par un espace puis un nombre
      const match = profilNameWithNumber.match(/^(.*) (\d+)$/);

      if (match) {
        const profilName = match[1].trim();
        const number = parseInt(match[2], 10);

        axios.get(`https://api.wolvesville.com/players/search?username=${profilName}`, {
          headers: headers
        })
          .then(response => {
            const responseData = response.data;
            const avatars = responseData.avatars;
            const nouvelleExtension = "@3x.png";

            if (!isNaN(number) && number >= 1 && number <= avatars.length) {
              const avatarUrl = avatars[number - 1].url.replace(".png", nouvelleExtension);
              message.reply(`**__Avatar ${number} de ${profilName}:__**\n[Lien vers l'avatar](${avatarUrl})`);
            } else {
              message.reply(`Numéro d'avatar invalide pour ${profilName}. Veuillez choisir un numéro entre 1 et ${avatars.length}`);
            }
          })
          .catch(error => {
            message.reply("Une erreur s'est produite lors de la requête.");
            console.error(error);
          });
      } else {
        const profilName = profilNameWithNumber;

        // Utiliser Axios pour effectuer la requête HTTP pour les avatars
        axios.get(`https://api.wolvesville.com/players/search?username=${profilName}`, {
          headers: headers
        })
          .then(response => {
            const responseData = response.data;
            const avatars = responseData.avatars;
            const nouvelleExtension = "@3x.png";
            const avatarUrls = avatars.map((avatar, index) => {
              const url = avatar.url.replace(".png", nouvelleExtension);
              return `!([Avatar ${index + 1}](${url}))`;
            });

            if (avatarUrls.length <= 12) {
              const formattedAvatars = avatarUrls.map(url => `> - ${url}`);
              message.reply(`**__Avatars de ${profilName}:__**\n${formattedAvatars.join('\n')}`);
            } else {
              // Si le nombre d'avatars est supérieur à 12, divisez-les en deux messages
              const first12Avatars = avatarUrls.slice(0, 12);
              const remainingAvatars = avatarUrls.slice(12);
              const formattedFirst12Avatars = first12Avatars.map(url => `${url}`);
              const formattedRemainingAvatars = remainingAvatars.map(url => `${url}`);

              // Répond au message de l'utilisateur avec les 12 premiers avatars dans le même salon
              message.reply(`**__Avatars de ${profilName} (1-12):__**\n${formattedFirst12Avatars.join('\n')}`);

              // Envoie un deuxième message avec les avatars restants dans le même salon
              message.reply(`**__Avatars de ${profilName} (13 et plus):__**\n${formattedRemainingAvatars.join('\n')}`);
            }
          })
          .catch(error => {
            message.reply("Une erreur s'est produite lors de la requête.");
            console.error(error);
          });
      }
    }
  });
}

module.exports = { start };
