export interface IFightCard {
  redCornerFighter: string,
  blueCornerFighter: string,
}

export interface IEvents {
  _id: number,
  title: string,
  date: string,
  time: string,
  fightNight: boolean,
  url: string,
}