// Browsers (and the DOM spec) are in the process of moving the event timestamp
// from being a DOMTimeStamp (mostly relative to Date.now()) to being
// a DOMHighResTimeStamp (always relative to performance.now()).

// A simple polyfill for making Event.timeStamp to always be a
// DOMHighResTimeStamp that can be compared with performance.now(). This becomes
// a no-op for browsers that provide high resolution event timestamp.
(function() {
  function timeNear(a, b) {
    var d = 1000 * 60 * 5;
    return a > b - d && a < b + d;
  }

  var testTimeStamp = !!window.CustomEvent ? new CustomEvent('test').timeStamp : document.createEvent('KeyboardEvent').timeStamp;

  // Do nothing if this browser is already using DOMHighResTimeStamp
  if (timeNear(testTimeStamp, performance.now()))
    return;

  // AFAICT Firefox uses two different timebases:
  //   1. Platform start time for all UA generated events.
  //   2. Unix epoch for all user script constructed events.
  // To handle this we maintain two different deltas, one for each, and use
  // |Event.isTrusted| to distinguish which one needs to be used.
  var timebaseDeltaForTrustedEvent_, timebaseDeltaForUntrustedEvent_;

  function getTimebaseDelta(event, timestamp) {
    // TODO: Perhaps we should re-compute the delta once in a while in case the
    // clocks get out of sync?
    if (event.isTrusted && timebaseDeltaForTrustedEvent_)
      return timebaseDeltaForTrustedEvent_;
    else if (!event.isTrusted && timebaseDeltaForUntrustedEvent_)
      return timebaseDeltaForUntrustedEvent_;

    // Adjust timebase by computing a delta which is the difference between
    // current high resolution time and given event time.
    var delta = Math.round(performance.now() - timestamp);

   if (event.hasOwnProperty('isTrusted')) {
      if (event.isTrusted)
        timebaseDeltaForTrustedEvent_ = delta;
      else
        timebaseDeltaForUntrustedEvent_ = delta;
    } else {
      timebaseDeltaForTrustedEvent_ = timebaseDeltaForUntrustedEvent_ = delta;
    }

    return delta;
  }

  // Redefine timeStamp property.
  var original = Object.getOwnPropertyDescriptor(Event.prototype, 'timeStamp');
  // Event.timeStamp is not configurable in Safari (bug?!) so we define time
  // instead.
  var newPropertyName = original.configurable ? 'timeStamp': 'time';

  Object.defineProperty(Event.prototype, newPropertyName, {
    configurable: true,
    enumerable: true,
    get: function() {
      var originalTimeStamp = original.get.call(this);
      var timebaseDelta = getTimebaseDelta(this, originalTimeStamp);

      // Some events in Firefox has timeStamp of 0. For these we generate a
      // timeStamp.
      if (!originalTimeStamp)
        return this.__polyfilled_timestamp || (this.__polyfilled_timestamp = performance.now());

      return originalTimeStamp + timebaseDelta;
    }
  });

})();


// Compatibility:
// At the moment it is IE9+ as it requires: |performance.now| which is IE9+
// and |Object.getOwnPropertyDescriptor| which is IE8+.
// Polyfilling performance.now() should be fairly simple but Polyfilling
// Object.getOwnPropertyDescriptor is more complicated.
