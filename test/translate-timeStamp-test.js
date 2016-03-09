describe('getHighResTimeStamp', function() {
  function createCustomEvent() {
    return (CustomEvent in self) ? new CustomEvent('test')
                                 : document.createEvent('KeyboardEvent');
  }

  it('should convert custom event timestamp to a high resolution timestamp with same origin as performance.now()', function() {
    // Depending on the browser the event.timeStamp time resolution may be
    // limited to milliseconds which is why Math.{floor,ceil} are used.
    var before = Math.floor(performance.now());
    var timestamp = getHighResTimeStamp(createCustomEvent());
    var after = Math.ceil(performance.now());
    expect(timestamp).to.be.least(before);
    expect(timestamp).to.be.most(after);
  });
});


