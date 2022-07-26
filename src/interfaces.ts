interface IFights {
  redCornerFighter: string,
  blueCornerFighter: string,
}

export interface IFightCard {
  _id: number,
  fights: IFights[],
}

export interface IEvents {
  _id: number,
  title: string,
  date: string,
  time: string,
  event: string,
  url: string,
}