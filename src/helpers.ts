import { IEvents, IFightCard } from './interfaces';

export const formatEventsResponse = (events: IEvents[]) => {
  let formattedResponse = '';
  events.forEach(({ _id, title, date, time, fightNight }) => {
    const dateObj = new Date(date);
    const dateToString = (dateNumber: number) => dateNumber.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const formattedLine = `\nEventId: ${_id} \nMain Fight: ${title} \nDate: ${dateToString(dateObj.getDate())}-${dateToString(dateObj.getMonth() + 1)}-${dateObj.getFullYear()} \nTime: ${time} \nEventType: ${fightNight ? 'UFC-FightNight' : 'UFC'} \nEvent Fights: /eventFights${_id} \n`;
    formattedResponse += formattedLine;
  });
  return formattedResponse;
};

export const formatEventFightsResponse = (eventFights: IFightCard[]) => {
  let formattedResponse = '';
  eventFights.forEach(({ redCornerFighter, blueCornerFighter }: IFightCard, index: number) => {
    formattedResponse += `${index === 0 ? 'Main Fight: ' : ''}${redCornerFighter.length <= 1 ? 'TBA' : redCornerFighter} vs ${blueCornerFighter.length <= 1 ? 'TBA' : blueCornerFighter}\n\n`;
  });
  return formattedResponse;
};