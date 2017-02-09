const expect = require('expect');

const {generateMessage} = require('./message');

describe('message.js', () => {
  describe('generateMessage', () => {
    it('should return a message with date stamp', ()=> {
      var text = 'Hello world';
      var from = 'Brooks';
      var message = generateMessage(from, text);

      expect(message).toContain({text, from});
      expect(message.createdAt).toBeA('number');
    });
  });
});