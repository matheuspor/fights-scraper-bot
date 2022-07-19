import { expect } from 'chai';

import Sinon from 'sinon';
import AwaitAndRespondUser from '../AwaitAndRespondUser';

describe('Tests AwaitAndRespond class', () => {
  beforeEach(() => {
    Sinon.restore();
  });

  it('Tests constructor', () => {
    const bot = Sinon.stub() as any;
    const awaitApiMethodStub = Sinon.stub(AwaitAndRespondUser.prototype, <any>'awaitApi');
    const chatId = 1;
    const awaitAndRespond = new AwaitAndRespondUser(bot, chatId);
    expect(awaitAndRespond.messageSent).to.be.equal(false);
    Sinon.assert.calledOnce(awaitApiMethodStub);
  });

  describe('Tests awaitApi method', () => {
    it('When messageSent is false', () => {
      const sendMessageStub = Sinon.stub();
      const bot = Sinon.stub().resolves({
        sendMessage: sendMessageStub,
      }) as any;
      const chatId = 1;
      (() => new AwaitAndRespondUser(bot, chatId))();
      setTimeout(() => {
        Sinon.assert.calledOnceWithExactly(sendMessageStub, chatId, 'A few more seconds...');
      }, 6000);
    });
    it('When messageSent is true', () => {
      const sendMessageStub = Sinon.stub();
      const bot = Sinon.stub().resolves({
        sendMessage: sendMessageStub,
      }) as any;
      const chatId = 1;
      const responseHandler = new AwaitAndRespondUser(bot, chatId);
      responseHandler.messageSent = true;
      setTimeout(() => {
        Sinon.assert.notCalled(sendMessageStub);
      }, 6000);
    });
  });
});