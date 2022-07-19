import { expect } from 'chai';
import { formatEvents, formatEventFights } from '../helpers';

describe('Tests helper functions', () => {
  const eventsMock = [
    { _id: 1, title: 'Teixeira vs Prochazka', url: 'https://www.ufc.com/event/ufc-275', date: '2022-06-11T00:00:00.000Z', time: '22:00 EDT', fightNight: false },
    { _id: 2, title: 'Kattar vs Emmett', url: 'https://www.ufc.com/event/ufc-fight-night-june-18-2022', date: '2022-06-18T00:00:00.000Z', time: '19:00 EDT', fightNight: true },
    { _id: 3, title: 'Tsarukyan vs Gamrot', url: 'https://www.ufc.com/event/ufc-fight-night-june-25-2022', date: '2022-06-25T00:00:00.000Z', time: '18:00 EDT', fightNight: true },
    { _id: 4, title: 'Adesanya vs Cannonier', url: 'https://www.ufc.com/event/ufc-276', date: '2022-07-02T00:00:00.000Z', time: '22:00 EDT', fightNight: false }];
  const eventFightsMock = [
    { redCornerFighter: 'Glover Teixeira', blueCornerFighter: 'Jiří Procházka' },
    { redCornerFighter: 'Valentina Shevchenko', blueCornerFighter: 'Taila Santos' },
    { redCornerFighter: 'Zhang Weili', blueCornerFighter: 'Joanna Jedrzejczyk' },
    { redCornerFighter: 'Andre Fialho', blueCornerFighter: 'Jake Matthews' },
    { redCornerFighter: 'Jack Della Maddalena', blueCornerFighter: 'Ramazan Emeev' },
    { redCornerFighter: 'Seungwoo Choi', blueCornerFighter: 'Josh Culibao' },
    { redCornerFighter: 'Maheshate', blueCornerFighter: 'Steve Garcia' },
    { redCornerFighter: 'Brendan Allen', blueCornerFighter: 'Jacob Malkoun' },
    { redCornerFighter: 'Kyung Ho Kang', blueCornerFighter: 'Batgerel Danaa' },
    { redCornerFighter: 'Liang Na', blueCornerFighter: 'Silvana Gomez Juarez' },
    { redCornerFighter: 'Ramona Pascual', blueCornerFighter: 'Joselyne Edwards' }];

  describe('Tests formatEvents', () => {
    const expectedResponse = 'Next events: \n\nid: 1 \nMain Fight: Teixeira vs Prochazka \nDate: 11-06-2022 \nTime: 22:00 EDT \nEventType: UFC \nEvent Fights: /eventFights1 \n\nid: 2 \nMain Fight: Kattar vs Emmett \nDate: 18-06-2022 \nTime: 19:00 EDT \nEventType: UFC-FightNight \nEvent Fights: /eventFights2 \n\nid: 3 \nMain Fight: Tsarukyan vs Gamrot \nDate: 25-06-2022 \nTime: 18:00 EDT \nEventType: UFC-FightNight \nEvent Fights: /eventFights3 \n\nid: 4 \nMain Fight: Adesanya vs Cannonier \nDate: 02-07-2022 \nTime: 22:00 EDT \nEventType: UFC \nEvent Fights: /eventFights4 \n';
    it('Returns formatted string', () => {
      const response = formatEvents(eventsMock);
      expect(response).to.equal(expectedResponse);
    });
  });
  describe('Tests formatEventFights', () => {
    const expectedResponse = 'Main Fight: Glover Teixeira vs Jiří Procházka\n\nValentina Shevchenko vs Taila Santos\n\nZhang Weili vs Joanna Jedrzejczyk\n\nAndre Fialho vs Jake Matthews\n\nJack Della Maddalena vs Ramazan Emeev\n\nSeungwoo Choi vs Josh Culibao\n\nMaheshate vs Steve Garcia\n\nBrendan Allen vs Jacob Malkoun\n\nKyung Ho Kang vs Batgerel Danaa\n\nLiang Na vs Silvana Gomez Juarez\n\nRamona Pascual vs Joselyne Edwards\n\n';

    it('Returns formatted string', () => {
      const response = formatEventFights(eventFightsMock);
      expect(response).to.equal(expectedResponse);
    });
  });
});
