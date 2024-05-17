import { TeamNames, Player } from '../types/types';

const InjuryType = [
  'Malherido',
  'Malherido',
  'Malherido',
  'Malherido',
  'Malherido',
  'Malherido',
  'Gravemente Herido',
  'Gravemente Herido',
  'Gravemente Herido',
  'Lesión seria',
  'Lesión seria',
  'Lesión seria',
  'Lesión permanente',
  'Lesión permanente',
  'Muerto',
  'Muerto'
];

const getNamesData = (
  event: { turnRosterId: number; matchEventType: number; lineUpId: number },
  teamLocal: TeamNames,
  teamVisitor: TeamNames,
  lineupsLocal: Array<Player>,
  lineupsVisitor: Array<Player>
) => {
  let playerName = '';
  let teamName = '';
  let team = [];
  if (event.turnRosterId == teamLocal.rosterId) {
    teamName = teamLocal.name;
    if (event.matchEventType == 8) {
      team = lineupsVisitor;
      teamName = teamVisitor.name;
    } else {
      team = lineupsLocal;
      teamName = teamLocal.name;
    }
    //let team = event.matchEventType == 8 ? lineupsVisitor : lineupsLocal;
    for (let player of team) {
      if (player.id == event.lineUpId) playerName = player.name;
    }
  }
  if (event.turnRosterId == teamVisitor.rosterId) {
    teamName = teamVisitor.name;
    let team = event.matchEventType == 8 ? lineupsLocal : lineupsVisitor;
    for (let player of team) {
      if (player.id == event.lineUpId) playerName = player.name;
    }
  }
  return { teamName: teamName, playerName: playerName };
};

const generateChroniclePrompt = async (matchId: string) => {
  const data = await fetch(`https://tourplay.net/api/match/${matchId}`);
  const match = await data.json();
  console.log(match);

  let events = '';

  let teamLocal = {
    name: match.inscriptionLocal.roster.teamName,
    rosterId: match.inscriptionLocal.roster.id
  };

  let teamVisitor = {
    name: match.inscriptionVisitor.roster.teamName,
    rosterId: match.inscriptionVisitor.roster.id
  };

  const lineupsLocal = match.inscriptionLocal.roster.lineUps;
  const lineupsVisitor = match.inscriptionVisitor.roster.lineUps;

  events += `- El partido se disputó entre el equipo local ${match.inscriptionLocal.roster.teamName} (equipo de ${match.inscriptionLocal.roster.teamRace}), y el equipo visitante ${match.inscriptionVisitor.roster.teamName} (equipo de ${match.inscriptionVisitor.roster.teamRace}).\n`;
  for (let event of match.matchEvents) {
    if (event.matchEventType == 8) {
      let { playerName, teamName } = getNamesData(
        event,
        teamLocal,
        teamVisitor,
        lineupsLocal,
        lineupsVisitor
      );
      events += `- El jugador ${playerName} del equipo ${teamName} sufrió una lesión ${
        InjuryType[event.extraData.roll1 - 1]
      }.\n`;
    } else if (event.matchEventType == 6) {
      let { playerName, teamName } = getNamesData(
        event,
        teamLocal,
        teamVisitor,
        lineupsLocal,
        lineupsVisitor
      );
      events += `- El jugador ${playerName} del equipo ${teamName} hizó una baja.\n`;
    } else if (event.matchEventType == 4) {
      let { playerName, teamName } = getNamesData(
        event,
        teamLocal,
        teamVisitor,
        lineupsLocal,
        lineupsVisitor
      );
      events += `- El jugador ${playerName} del equipo ${teamName} marcó un TouchDown.\n`;
    } else {
      //   console.log(event);
    }
  }
  const prompt = `Creame una crónica de entre 600 y 1000 palabras de un partido de bloodbowl como si fueses los comentariastas Jim y Bob en el que ocurrieron los siguientes eventos:${events}`;
  return prompt;
};
