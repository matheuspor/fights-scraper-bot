import { expect } from 'chai';

import Sinon from 'sinon';
import AwaitAndRespond from '../AwaitAndRespond';

describe('Tests AwaitAndRespond class', () => {
  beforeEach(() => {
    Sinon.restore();
  });

  it('Tests constructor', () => {
    const bot = Sinon.stub() as any;
    const awaitApiMethodStub = Sinon.stub(AwaitAndRespond.prototype, <any>'awaitApi');
    const chatId = 1;
    const awaitAndRespond = new AwaitAndRespond(bot, chatId);
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
      (() => new AwaitAndRespond(bot, chatId))();
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
      const responseHandler = new AwaitAndRespond(bot, chatId);
      responseHandler.messageSent = true;
      setTimeout(() => {
        Sinon.assert.notCalled(sendMessageStub);
      }, 6000);
    });
  });
});