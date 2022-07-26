import { IEvents, IFightCard } from './interfaces';

export const formatEvents = (events: IEvents[]) => {
  let formattedResponse = 'Next events: \n';
  events.forEach(({ _id, title, date, time, event }) => {
    const dateObj = new Date(date);
    const dateToString = (dateNumber: number) => dateNumber.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const formattedLine = `\nid: ${_id} \nMain Fight: ${title} \nDate: ${dateToString(dateObj.getDate())}-${dateToString(dateObj.getMonth() + 1)}-${dateObj.getFullYear()} \nTime: ${time} \nEvent: ${event} \nEvent Fights: /eventFights${_id} \n`;
    formattedResponse += formattedLine;
  });
  return formattedResponse;
};

export const formatEventFights = (apiResponse: IFightCard) => {
  const { fights } = apiResponse;
  let formattedResponse = 'Main Fight: ';
  fights.forEach(({ redCornerFighter, blueCornerFighter }) => {
    formattedResponse += `${redCornerFighter.length <= 1 ? 'TBA' : redCornerFighter} vs ${blueCornerFighter.length <= 1 ? 'TBA' : blueCornerFighter}\n\n`;
  });
  return formattedResponse;
};