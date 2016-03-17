// This is a sanity test to ensure that the browser is using the correct time origin
// for performance.now() which is important for the accuracy of our time conversion
// logic.
describe('High resolution timestamp time origin', function() {
  it('should be performance.timing.navigationStart', function() {
    if (performance && 'timing' in performance) {
      var dNow = Date.now();
      var pNow = performance.now();
      var calculatedHRTimeOrigin = dNow - pNow ;

      // Above calculations includes the time it takes to run Date.now()
      // and performance.now() in sequence which we assume is bounded to 1ms.
      var EXECUTION_COST = 1,
          ROUNDING_ERROR = 1;
      console.log('navigationStart:'+ performance.timing.navigationStart +' performance.now:' + pNow +' Date.now:'+dNow);
      console.log('diff: ' + (calculatedHRTimeOrigin - performance.timing.navigationStart));

      expect(Math.abs(calculatedHRTimeOrigin - performance.timing.navigationStart)).to.be.most(ROUNDING_ERROR + EXECUTION_COST);
    } else {
      console.log('Missing performance.timing.navigationStart');
    }
  });
});

