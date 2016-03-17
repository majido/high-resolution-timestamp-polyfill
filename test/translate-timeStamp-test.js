describe('getHighResTimeStamp', function() {
  function createCustomEvent() {
    if ('CustomEvent' in self && (typeof window.CustomEvent === 'function' ||
          window.CustomEvent.toString().indexOf('CustomEventConstructor') > -1)) {
      return new CustomEvent('CustomEvent');
    } else {
      return document.createEvent('CustomEvent');
    }
  }

  function createFakeEvent() {
    return {
      type: 'FakeEvent',
      timeStamp: Date.now()
    };
  }

  function createFakeEventWithZeroTS() {
    return {
      type: 'FakeEventWithZeroTS',
      timeStamp: 0
    };
  }

  function createFakeEventWithMicrosecondsTS() {
    return {
      type: 'FakeEventWithMicrosecondsTS',
      timeStamp: Date.now() * 1000
    };
  }

  function createFakeEventWithSystemStartupTS() {
    return {
      type: 'FakeEventWithSystemStartupTS',
      timeStamp: performance.now() * 42 // performance.now() < ts < Date.now()
    };
  }

  var tests = [
    createFakeEvent,
    createFakeEventWithZeroTS,
    createFakeEventWithMicrosecondsTS,
    createFakeEventWithSystemStartupTS,
    // In IE 9, 10 the CustomEvent timestamps may actually be higher than
    // Date.now() which breaks this test.
    // createCustomEvent
  ];

  tests.forEach(function(createEventFunc) {
    it('should convert event timestamp to a high resolution timestamp with same origin as performance.now()', function() {
      // Depending on the browser the event.timeStamp time resolution may be
      // limited to milliseconds which is why Math.{floor,ceil} are used.
      var before = Math.floor(performance.now());
      var evt = createEventFunc();
      console.log('Event type:' + evt.type);
      var hrTimestamp = getHighResTimeStamp(evt);
      var after = Math.ceil(performance.now());
      expect(Math.round(hrTimestamp)).to.be.least(before);
      expect(Math.round(hrTimestamp)).to.be.most(after);
    });
  });
});
