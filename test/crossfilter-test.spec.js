/* global Promise */
var assert = {
  equal: function(a, b, done) {
    return Promise.resolve(a).then(function(aResult) {
      Promise.resolve(b).then(function(bResult) {
        expect(aResult).toEqual(bResult);
        if(done) done();
      })
    });
  },
  strictEqual: function(a, b, done) {
    return Promise.resolve(a).then(function(aResult) {
      Promise.resolve(b).then(function(bResult) {
        expect(aResult).toEqual(bResult);
        if(done) done();
      })
    });
  },
  deepEqual: function(a, b, done) {
    return Promise.resolve(a).then(function(aResult) {
      Promise.resolve(b).then(function(bResult) {
        expect(aResult).toEqual(bResult);
        if(done) done();
      })
    });
  },
  isTrue: function(a, done) {
    return Promise.resolve(a).then(function(aResult) {
      expect(aResult).toBeTruthy();
      if(done) done();
    });
  },
  isFalse: function(a, done) {
    return Promise.resolve(a).then(function(aResult) {
      expect(aResult).not.toBeTruthy();
      if(done) done();
    });
  },
  lesser: function(a, b, done) {
    return Promise.resolve(a).then(function(aResult) {
      Promise.resolve(b).then(function(bResult) {
        expect(aResult).toBeLessThan(bResult);
        if(done) done();
      })
    });
  },
}

describe("promisefilter", function() {
    var data;
    beforeEach(function() {
      data = promisefilter([
        {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
        {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T16:54:06Z", quantity: 1, total: 100, tip: null, type: "cash"},
        {date: "2011-11-14T17:02:03Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: null, type: "cash"},
        {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T17:33:46Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T17:33:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T17:52:02Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T18:02:42Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T18:02:51Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T18:12:54Z", quantity: 1, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T18:14:53Z", quantity: 2, total: 100, tip: null, type: "cash"},
        {date: "2011-11-14T18:45:24Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T20:06:33Z", quantity: 1, total: 100, tip: null, type: "cash"},
        {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab"},
        {date: "2011-11-14T21:05:36Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"},
        {date: "2011-11-14T21:22:31Z", quantity: 1, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T21:26:30Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T21:30:55Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T21:31:05Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab"},
        {date: "2011-11-14T22:34:28Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T22:48:05Z", quantity: 2, total: 91, tip: 0, type: "tab"},
        {date: "2011-11-14T22:51:40Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"},
        {date: "2011-11-14T23:06:25Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T23:07:58Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T23:21:22Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab"}
      ]);

      // be sure you don't clobber a built-in method if you do this!
      try {
        data.date = data.dimension(function(d) { return new Date(d.date); });
        data.quantity = data.dimension(function(d) { return d.quantity; });
        data.tip = data.dimension(function(d) { return d.tip; });
        data.total = data.dimension(function(d) { return d.total; });
        data.type = data.dimension(function(d) { return d.type; });
      } catch (e) {
        console.log(e.stack);
      }
    });

    it("up to 32 dimensions supported", function(done) {
      var data = promisefilter([]);
      for (var i = 0; i < 32; i++) data.dimension(function() { return 0; });
      done();
    });

    it("can add and remove 32 dimensions repeatedly", function(done) {
      var data = promisefilter([]),
          dimensions = [];
      for (var j = 0; j < 10; j++) {
        for (var i = 0; i < 32; i++) dimensions.push(data.dimension(function() { return 0; }));
        while (dimensions.length) dimensions.pop().dispose();
      }
      done();
    });

    describe("empty data", function() {
      var data;
      beforeEach(function() {
        data = promisefilter([]);
        try {
          data.quantity = data.dimension(function(d) { return d.quantity; });
        } catch (e) {
          console.log(e.stack);
        }
      });

      describe("groupAll", function() {
        beforeEach(function() {
          data.allGrouped = data.groupAll();
        })
        it("value", function(done) {
          assert.equal(data.allGrouped.value(), 0, done);
        });
        it("value after adding data", function(done) {
          data.add([{quantity: 2, total: 190}]);
          assert.equal(data.allGrouped.value(), 1, done);
        });
        it("value after removing all data", function(done) {
          data.add([{quantity: 2, total: 190}]);
          data.remove();
          assert.equal(data.allGrouped.value(), 0, done);
        });
      });

      describe("dimension", function() {

        describe("groupAll (count, the default)", function() {
          beforeEach(function() {
            data.quantity.count = data.quantity.groupAll();
          });
          it("value", function(done) {
            assert.equal(data.quantity.count.value(), 0, done);
          });
          it("value after removing all data", function(done) {
            try {
              data.add([{quantity: 2, total: 190}]);
              assert.equal(data.quantity.count.value(), 1);
            } finally {
              data.remove();
              assert.equal(data.quantity.count.value(), 0, done);
            }
          });
        });

        describe("groupAll (sum of total)", function() {
          beforeEach(function() {
            data.quantity.total = data.quantity.groupAll().reduceSum(function(d) { return d.total; });
          });
          it("value", function(done) {
            assert.equal(data.quantity.total.value(), 0, done);
          });
          it("value after removing all data", function(done) {
            try {
              data.add([{quantity: 2, total: 190}]);
              assert.equal(data.quantity.total.value(), 190);
            } finally {
              data.remove();
              assert.equal(data.quantity.total.value(), 0, done);
            }
          });
        });

        describe("groupAll (custom reduce)", function() {
          beforeEach(function() {
            data.quantity.custom = data.quantity.groupAll().reduce(add, remove, initial);
            function add(p, v) { return p + 1; }
            function remove(p, v) { return p - 1; }
            function initial() { return 1; }
          });
          it("value", function(done) {
            assert.equal(data.quantity.custom.value(), 1, done);
          });
          it("value after removing all data", function(done) {
            try {
              data.add([{quantity: 2, total: 190}]);
              assert.equal(data.quantity.custom.value(), 2);
            } finally {
              data.remove();
              assert.equal(data.quantity.custom.value(), 1, done);
            }
          });
        });

        describe("groupAll (custom reduce information lifecycle)", function() {
          var data;
          beforeEach(function() {
            data = promisefilter();
            data.add([{foo: 1, val: 2}, {foo: 2, val: 2}, {foo: 3, val: 2}, {foo: 3, val: 2}]);
            data.foo = data.dimension(function(d) { return d.foo; });
            data.bar = data.dimension(function(d) { return d.foo; });
            data.val = data.dimension(function(d) { return d.val; });
            data.groupMax = data.bar.groupAll().reduce(function(p,v,n){
              if(n) {
                p += v.val;
              }
              return p;
            }, function(p,v,n) {
              if(n) {
                p -= v.val;
              }
              return p;
            }, function() {
              return 0;
            });
            data.groupSum = data.bar.groupAll().reduceSum(function(d) { return d.val; });
          });
          it("on group creation", function(done) {
            assert.deepEqual(data.groupMax.value(), data.groupSum.value(), done);
          });
          it("on filtering", function(done) {
            data.foo.filterRange([1, 3]);
            assert.deepEqual(data.groupMax.value(), 8);
            assert.deepEqual(data.groupSum.value(), 4);
            data.foo.filterAll().then(done);
          });
          it("on adding data after group creation", function(done) {
            data.add([{foo: 1, val: 2}]);
            assert.deepEqual(data.groupMax.value(), data.groupSum.value(), done);
          });
          it("on adding data when a filter is in place", function(done) {
            data.foo.filterRange([1,3]);
            data.add([{foo: 3, val: 1}]);
            assert.deepEqual(data.groupMax.value(), 9);
            assert.deepEqual(data.groupSum.value(), 4);
            data.foo.filterAll().then(done);
          });
          it("on removing data after group creation", function(done) {
            data.val.filter(1);
            data.remove();
            assert.deepEqual(data.groupMax.value(), 8);
            assert.deepEqual(data.groupSum.value(), 0);

            data.val.filterAll();
            assert.deepEqual(data.groupMax.value(), data.groupSum.value(), done);
          });
        });
      });
    });

    // it("up to 64 dimensions supported", function() {
    //   var data = promisefilter([]);
    //   for (var i = 0; i < 64; i++) data.dimension(function() { return 0; });
    // });

    // it("can add and remove 64 dimensions repeatedly", function() {
    //   var data = promisefilter([]),
    //       dimensions = [];
    //   for (var j = 0; j < 10; j++) {
    //     for (var i = 0; i < 64; i++) dimensions.push(data.dimension(function() { return 0; }));
    //     while (dimensions.length) dimensions.pop().dispose();
    //   }
    // });

    // it("filtering with more than 32 dimensions", function(done) {
    //   var data = promisefilter();
    //   var dims = {};

    //   for (var i = 0; i < 50; i++) {
    //     data.add([{value: i}]);
    //   }

    //   var dimfunc = function(i) {
    //     return function(val) {
    //       return val.value == i;
    //     }
    //   }

    //   for (var i = 0; i < 50; i++) {
    //     // This doesn't work because the i in the execution context doesn't get transferred.
    //     dims[i] = data.dimension(dimfunc(i));
    //   }

    //   for (var i = 0; i < 50; i++) {
    //     dims[i].filter(1);
    //     data.remove();
    //     dims[i].filterAll();
    //     assert.equal(data.size(), 49 - i);
    //   }
    //   assert.equal(data.size(), 0);
    // });

    describe("dimension", function() {

      describe("top", function() {
        it("returns the top k records by value, in descending order", function(done) {
          assert.deepEqual(data.total.top(3), [
            {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
            {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab"},
            {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"}
          ]);
          assert.deepEqual(data.date.top(3), [
            {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-14T23:21:22Z", quantity: 2, total: 190, tip: 100, type: "tab"}
          ], done);
        });
        it("observes the associated dimension's filters", function(done) {
          try {
            data.quantity.filterExact(4);
            assert.deepEqual(data.total.top(3), [
              {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"}
            ]);
          } finally {
            data.quantity.filterAll();
          }
          try {
            data.date.filterRange([new Date(Date.UTC(2011, 10, 14, 19)), new Date(Date.UTC(2011, 10, 14, 20))]);
            assert.deepEqual(data.date.top(10), [
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
            data.date.filterRange([Date.UTC(2011, 10, 14, 19), Date.UTC(2011, 10, 14, 20)]); // also comparable
            assert.deepEqual(data.date.top(10), [
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
          } finally {
            data.date.filterAll().then(done);
          }
        });
        it("observes other dimensions' filters", function(done) {
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.total.top(2), [
              {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab"},
              {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.total.top(1), [
              {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.tip.top(1), [
              {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa"}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
              {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.date.top(1), [
              {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa"}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.date.top(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll().then(done);
          }
        });
        it("negative or zero k returns an empty array", function(done) {
          assert.deepEqual(data.quantity.top(0), []);
          assert.deepEqual(data.quantity.top(-1), []);
          assert.deepEqual(data.quantity.top(NaN), []);
          assert.deepEqual(data.quantity.top(-Infinity), []);
          assert.deepEqual(data.date.top(0), []);
          assert.deepEqual(data.date.top(-1), []);
          assert.deepEqual(data.date.top(NaN), []);
          assert.deepEqual(data.date.top(-Infinity), [], done);
        });
      });

      describe("bottom", function() {
        it("returns the bottom k records by value, in descending order", function(done) {
          assert.deepEqual(data.total.bottom(3), [
            {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab"},
            {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
            {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"}
          ]);
          assert.deepEqual(data.date.bottom(3), [
            {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"}
         ], done);
        });
        it("observes the associated dimension's filters", function(done) {
          try {
            data.quantity.filterExact(4);
            assert.deepEqual(data.total.bottom(3), [
              {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"}
            ]);
          } finally {
            data.quantity.filterAll().then(done);
          }
          try {
            data.date.filterRange([new Date(Date.UTC(2011, 10, 14, 19)), new Date(Date.UTC(2011, 10, 14, 20))]);
            assert.deepEqual(data.date.bottom(10), [
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab"},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab"}
            ]);
            data.date.filterRange([Date.UTC(2011, 10, 14, 19), Date.UTC(2011, 10, 14, 20)]); // also comparable
            assert.deepEqual(data.date.bottom(10), [
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, type: "tab", tip: 100},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, type: "tab", tip: 0},
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, type: "tab", tip: 0}
            ]);
          } finally {
            data.date.filterAll().then(done);
          }
        });
        it("observes other dimensions' filters", function(done) {
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.total.bottom(2), [
              {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab"},
              {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.total.bottom(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.tip.bottom(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.date.bottom(2), [
              {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
              {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.date.bottom(1), [
              {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.date.bottom(1), [
              {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa"}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll().then(done);
          }
        });
        it("negative or zero k returns an empty array", function(done) {
          assert.deepEqual(data.quantity.bottom(0), []);
          assert.deepEqual(data.quantity.bottom(-1), []);
          assert.deepEqual(data.quantity.bottom(NaN), []);
          assert.deepEqual(data.quantity.bottom(-Infinity), []);
          assert.deepEqual(data.date.bottom(0), []);
          assert.deepEqual(data.date.bottom(-1), []);
          assert.deepEqual(data.date.bottom(NaN), []);
          assert.deepEqual(data.date.bottom(-Infinity), [], done);
        });
      });

      describe("filterExact", function() {
        it("selects records that match the specified value exactly", function(done) {
          try {
            data.tip.filterExact(100);
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
              {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
          } finally {
            data.tip.filterAll().then(done);
          }
        });
        it("allows the filter value to be null", function(done) {
          try {
            data.tip.filterExact(null); // equivalent to 0 by natural ordering
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"},
              {date: "2011-11-14T22:48:05Z", quantity: 2, total: 91, tip: 0, type: "tab"}
            ]);
          } finally {
            data.tip.filterAll().then(done);
          }
        });
      });

      // Not failing - TODO
      describe("filterRange", function() {
        it("selects records greater than or equal to the inclusive lower bound", function(done) {
          var ps = [];
          try {
            data.total.filterRange([100, 190]);
            ps.push(assert.isTrue(data.date.top(Infinity).then(function(a) { return a.every(function(d) { return d.total >= 100; }); })));
            data.total.filterRange([110, 190]);
            // Empty set.
            ps.push(assert.isTrue(data.date.top(Infinity).then(function(a) { return a.every(function(d) { return d.total >= 110; }); })));
          } finally {
            ps.push(data.total.filterAll());
          }
          Promise.all(ps).then(done);
        });
        it("selects records less than the exclusive lower bound", function(done) {
          var ps = [];
          try {
            data.total.filterRange([100, 200]);
            ps.push(assert.isTrue(data.date.top(Infinity).then(function(a) { return a.every(function(d) { return d.total < 200; }); })));
            data.total.filterRange([100, 190]);
            ps.push(assert.isTrue(data.date.top(Infinity).then(function(a) { return a.every(function(d) { return d.total < 190; }); })));
          } finally {
            ps.push(data.total.filterAll());
          }
          Promise.all(ps).then(done);
        });
      });

      describe("filterAll", function() {
        it("clears the filter", function(done) {
          data.total.filterRange([100, 200]);
          assert.lesser(data.date.top(Infinity).then(function(a) { return a.length; }), 43);
          data.total.filterAll();
          assert.equal(data.date.top(Infinity).then(function(a) { return a.length; }), 43, done);
        });
      });

      describe("filterFunction", function() {
        it("selects records according to an arbitrary function", function(done) {
          try {
            data.total.filterFunction(function(d) { return d % 2; });
            assert.isTrue(data.date.top(Infinity).then(function(a) { return a.every(function(d) { return d.total % 2; }); }));
          } finally {
            data.total.filterAll().then(done);
          }
        });
        it("respects truthy values", function(done) {
          try {
            var group = data.quantity.groupAll().reduceCount();
            data.total.filterRange([200, Infinity]);
            data.total.filterFunction(function(d) { return "0"; });
            assert.equal(group.value(), 43);
            data.total.filterFunction(function(d) { return ""; });
            assert.equal(group.value(), 0);
          } finally {
            data.total.filterAll().then(done);
          }
        });
        it("groups on the first dimension are updated correctly", function(done) {
          try {
            var group = data.date.groupAll().reduceCount();
            data.total.filterFunction(function(d) { return d === 90; });
            assert.equal(group.value(), 13);
            data.total.filterFunction(function(d) { return d === 91; });
            assert.equal(group.value(), 1);
          } finally {
            data.total.filterAll().then(done);
          }
        });
        it("followed by filterRange", function(done) {
          try {
            data.total.filterFunction(function(d) { return d % 2; });
            data.total.filterRange([100, 200]);
            assert.deepEqual(data.date.top(Infinity).then(function(a) { return a.length; }), 19);
          } finally {
            data.total.filterAll().then(done);
          }
        });
      });

      describe("filter", function() {
        it("is equivalent to filterRange when passed an array", function(done) {
          try {
            data.total.filter([100, 190]);
            assert.isTrue(data.date.top(Infinity).then(function(a) { return a.every(function(d) { return d.total >= 100; }); }));
          } finally {
            data.total.filter(null).then(done);
          }
        });
        it("is equivalent to filterExact when passed a single value", function(done) {
          try {
            data.total.filter(100);
            assert.isTrue(data.date.top(Infinity).then(function(a) { return a.every(function(d) { return d.total == 100; }); }));
          } finally {
            data.total.filter(null).then(done);
          }
        });
        // NOT SUPPORTED IN ASYNC MODE (yet)
        // it("is equivalent to filterFunction when passed a function", function(done) {
        //   try {
        //     data.total.filter(function(d) { return d % 2; });
        //     assert.isTrue(data.date.top(Infinity).then(function(a) { return a.every(function(d) { return d.total % 2; }); }));
        //   } finally {
        //     data.total.filter(null).then(done);
        //   }
        // });
        it("is equivalent to filterAll when passed null", function(done) {
          data.total.filter([100, 200]);
          assert.lesser(data.date.top(Infinity).then(function(a) { return a.length; }), 43);
          data.total.filter(null);
          assert.equal(data.date.top(Infinity).then(function(a) { return a.length; }), 43, done);
        });
      });

      describe("groupAll (count, the default)", function() {
        beforeEach(function() {
          data.quantity.count = data.quantity.groupAll();
        });

        it("does not have top and order methods", function(done) {
          assert.isFalse("top" in data.quantity.count);
          assert.isFalse("order" in data.quantity.count).then(done);
        });

        describe("reduce", function() {
          it("reduces by add, remove, and initial", function(done) {
            try {
              data.quantity.count.reduce(
                  function(p, v) { return p + v.total; },
                  function(p, v) { return p - v.total; },
                  function() { return 0; });
              assert.strictEqual(data.quantity.count.value(), 6660);
            } finally {
              data.quantity.count.reduceCount();
              data.quantity.filterAll().then(done);
            }
          });
        });

        describe("reduceCount", function() {
          it("reduces by count", function(done) {
            data.quantity.count.reduceSum(function(d) { return d.total; });
            assert.strictEqual(data.quantity.count.value(), 6660);
            data.quantity.count.reduceCount();
            assert.strictEqual(data.quantity.count.value(), 43).then(done);
          });
        });

        describe("reduceSum", function() {
          it("reduces by sum of accessor function", function(done) {
            try {
              data.quantity.count.reduceSum(function(d) { return d.total; });
              assert.strictEqual(data.quantity.count.value(), 6660);
              data.quantity.count.reduceSum(function() { return 1; });
              assert.strictEqual(data.quantity.count.value(), 43);
            } finally {
              data.quantity.count.reduceCount();
              data.quantity.filterAll().then(done);
            }
          });
        });

        describe("value", function() {
          it("returns the count of matching records", function(done) {
            assert.strictEqual(data.quantity.count.value(), 43).then(done);
          });
          it("does not observe the associated dimension's filters", function(done) {
            try {
              data.quantity.filterRange([100, 200]);
              assert.strictEqual(data.quantity.count.value(), 43);
            } finally {
              data.quantity.filterAll().then(done);
            }
          });
          it("observes other dimensions' filters", function(done) {
            try {
              data.type.filterExact("tab");
              assert.strictEqual(data.quantity.count.value(), 32);
              data.type.filterExact("visa");
              assert.strictEqual(data.quantity.count.value(), 7);
              data.tip.filterExact(100);
              assert.strictEqual(data.quantity.count.value(), 5);
            } finally {
              data.type.filterAll();
              data.tip.filterAll().then(done);
            }
          });
        });

        describe("dispose", function() {
          it("detaches from reduce listeners", function(done) {
            var data = promisefilter([0, 1, 2]),
                callback, // indicates a reduce has occurred in this group
                dimension = data.dimension(function(d) { return d; }),
                other = data.dimension(function(d) { return d; }),
                all = dimension.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            all.value(); // force this group to be reduced when filters change
            callback = false;
            all.dispose();
            other.filterRange([1, 2]);
            assert.isFalse(callback).then(done);
          });
          it("detaches from add listeners", function(done) {
            var data = promisefilter([0, 1, 2]),
                callback, // indicates data has been added and triggered a reduce
                dimension = data.dimension(function(d) { return d; }),
                all = dimension.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            all.value(); // force this group to be reduced when data is added
            callback = false;
            all.dispose();
            data.add([3, 4, 5]);
            assert.isFalse(callback).then(done);
          });
        });
      });

      describe("groupAll (sum of total)", function() {
        beforeEach(function() {
          data.quantity.total = data.quantity.groupAll().reduceSum(function(d) { return d.total; });
        });

        it("does not have top and order methods", function(done) {
          assert.isFalse("top" in data.quantity.total);
          assert.isFalse("order" in data.quantity.total).then(done);
        });

        describe("reduce", function() {
          it("determines the computed reduce value", function(done) {
            try {
              data.quantity.total.reduce(
                  function(p) { return p + 1; },
                  function(p) { return p - 1; },
                  function() { return 0; });
              assert.strictEqual(data.quantity.total.value(), 43);
            } finally {
              data.quantity.total.reduceSum(function(d) { return d.total; });
              data.quantity.filterAll().then(done);
            }
          });
        });

        describe("value", function() {
          it("returns the sum total of matching records", function(done) {
            assert.strictEqual(data.quantity.total.value(), 6660).then(done);
          });
          it("does not observe the associated dimension's filters", function(done) {
            try {
              data.quantity.filterRange([100, 200]);
              assert.strictEqual(data.quantity.total.value(), 6660);
            } finally {
              data.quantity.filterAll().then(done);
            }
          });
          it("observes other dimensions' filters", function(done) {
            try {
              data.type.filterExact("tab");
              assert.strictEqual(data.quantity.total.value(), 4760);
              data.type.filterExact("visa");
              assert.strictEqual(data.quantity.total.value(), 1400);
              data.tip.filterExact(100);
              assert.strictEqual(data.quantity.total.value(), 1000);
            } finally {
              data.type.filterAll();
              data.tip.filterAll().then(done);
            }
          });
        });
      });

      describe("group", function() {
        beforeEach(function() {
          data.date.hours = data.date.group(function(d) { d = new Date(+d); d.setHours(d.getHours(), 0, 0, 0); return d; });
          data.type.types = data.type.group();
        });

        it("key defaults to value", function(done) {
          assert.deepEqual(data.type.types.top(Infinity), [
            {key: "tab", value: 32},
            {key: "visa", value: 7},
            {key: "cash", value: 4}
          ]).then(done);
        });

        it("cardinality may be greater than 256", function(done) {
          var data = promisefilter(d3.range(256).concat(256, 256)),
              index = data.dimension(function(d) { return d; }),
              indexes = index.group();
          assert.deepEqual(index.top(2), [256, 256]);
          assert.deepEqual(indexes.top(1), [{key: 256, value: 2}]);
          assert.equal(indexes.size(), 257).then(done);
        });

        it("cardinality may be greater than 65536", function(done) {
          var data = promisefilter(d3.range(65536).concat(65536, 65536)),
              index = data.dimension(function(d) { return d; }),
              indexes = index.group();
          assert.deepEqual(index.top(2), [65536, 65536]);
          assert.deepEqual(indexes.top(1), [{key: 65536, value: 2}]);
          assert.equal(indexes.size(), 65537).then(done);
        });

        it("adds all records before removing filtered", function(done) {
          try {
            data.quantity.filter(1);
            // Group only adds
            var addGroup = data.type.group().reduce(
                function(p, v) {
                  ++p;
                  return p;
                }, function(p, v) {
                  return p;
                }, function() {
                  return 0;
                }
              );
            // Normal group
            var stdGroup = data.type.group();
            assert.isTrue(addGroup.top(1).then(function(a) { return a[0].value > stdGroup.top(1)[0].value; }));
          } finally {
            data.quantity.filterAll().then(done);
          }
        });

        describe("size", function() {
          it("returns the cardinality", function(done) {
            assert.equal(data.date.hours.size(), 8);
            assert.equal(data.type.types.size(), 3).then(done);
          });
          it("ignores any filters", function(done) {
            try {
              data.type.filterExact("tab");
              data.quantity.filterRange([100, 200]);
              assert.equal(data.date.hours.size(), 8);
              assert.equal(data.type.types.size(), 3);
            } finally {
              data.quantity.filterAll();
              data.type.filterAll().then(done);
            }
          });
        });

        describe("reduce", function() {
          it("defaults to count", function(done) {
            assert.deepEqual(data.date.hours.top(1), [
              {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: 9}
            ]).then(done);
          });
          it("determines the computed reduce value", function(done) {
            try {
              data.date.hours.reduceSum(function(d) { return d.total; });
              assert.deepEqual(data.date.hours.top(1), [
                {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: 1240}
              ]);
            } finally {
              data.date.hours.reduceCount();
              data.date.filterAll().then(done);
            }
          });
          describe("gives reduce functions information on lifecycle of data element", function() {
            var data;
            beforeEach(function() {
              data = promisefilter();
              data.add([{foo: 1, val: 2}, {foo: 2, val: 2}, {foo: 3, val: 2}, {foo: 3, val: 2}]);
              data.foo = data.dimension(function(d) { return d.foo; });
              data.bar = data.dimension(function(d) { return d.foo; });
              data.val = data.dimension(function(d) { return d.val; });
              data.groupMax = data.bar.group().reduce(function(p,v,n){
                if(n) {
                  p += v.val;
                }
                return p;
              }, function(p,v,n) {
                if(n) {
                  p -= v.val;
                }
                return p;
              }, function() {
                return 0;
              });
              data.groupSum = data.bar.group().reduceSum(function(d) { return d.val; });

              return data;
            });
            it("on group creation", function(done) {
              assert.deepEqual(data.groupMax.all(), data.groupSum.all()).then(done);
            });
            it("on filtering", function(done) {
              data.foo.filterRange([1, 3]);
              assert.deepEqual(data.groupMax.all(), [{ key: 1, value: 2 }, { key: 2, value: 2 }, { key: 3, value: 4 }]);
              assert.deepEqual(data.groupSum.all(), [{ key: 1, value: 2 }, { key: 2, value: 2 }, { key: 3, value: 0 }]);
              data.foo.filterAll().then(done);
            });
            it("on adding data after group creation", function(done) {
              data.add([{foo: 1, val: 2}]);
              assert.deepEqual(data.groupMax.all(), data.groupSum.all()).then(done);
            });
            it("on adding data when a filter is in place", function(done) {
              data.foo.filterRange([1,3]);
              data.add([{foo: 3, val: 1}]);
              assert.deepEqual(data.groupMax.all(), [{ key: 1, value: 2 }, { key: 2, value: 2 }, { key: 3, value: 5 }]);
              assert.deepEqual(data.groupSum.all(), [{ key: 1, value: 2 }, { key: 2, value: 2 }, { key: 3, value: 0 }]);
              data.foo.filterAll().then(done);
            });
            it("on removing data after group creation", function(done) {
              data.val.filter(1);
              data.remove();
              assert.deepEqual(data.groupMax.all(), [{ key: 1, value: 2 },{ key: 2, value: 2 },{ key: 3, value: 4 }]);
              assert.deepEqual(data.groupSum.all(), [{ key: 1, value: 0 },{ key: 2, value: 0 },{ key: 3, value: 0 }]);

              data.val.filterAll();
              assert.deepEqual(data.groupMax.all(), data.groupSum.all()).then(done);
            });
          });
        });

        describe("top", function() {
          it("returns the top k groups by reduce value, in descending order", function(done) {
            assert.deepEqual(data.date.hours.top(3), [
              {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: 9},
              {key: new Date(Date.UTC(2011, 10, 14, 16, 0, 0)), value: 7},
              {key: new Date(Date.UTC(2011, 10, 14, 21, 0, 0)), value: 6}
            ]).then(done);
          });
          it("observes the specified order", function(done) {
            try {
              data.date.hours.order(function(v) { return -v; });
              assert.deepEqual(data.date.hours.top(3), [
                {key: new Date(Date.UTC(2011, 10, 14, 20, 0, 0)), value: 2},
                {key: new Date(Date.UTC(2011, 10, 14, 19, 0, 0)), value: 3},
                {key: new Date(Date.UTC(2011, 10, 14, 18, 0, 0)), value: 5}
              ]);
            } finally {
              data.date.hours.order(function(v) { return v; });
              data.date.filterAll().then(done);
            }
          });
        });

        describe("order", function() {
          it("defaults to the identity function", function(done) {
            assert.deepEqual(data.date.hours.top(1), [
              {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: 9}
            ]).then(done);
          });
          it("is useful in conjunction with a compound reduce value", function(done) {
            try {
              data.date.hours.reduce(
                  function(p, v) { ++p.count; p.total += v.total; return p; },
                  function(p, v) { --p.count; p.total -= v.total; return p; },
                  function() { return {count: 0, total: 0}; })
                  .order(function(v) { return v.total; });
              assert.deepEqual(data.date.hours.top(1), [
                {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: {count: 9, total: 1240}}
              ]);
            } finally {
              data.date.hours.reduceCount().orderNatural();
              data.date.filterAll().then(done);
            }
          });
        });

        // This doesn't work with the async approach.
      //   describe("dispose", function() {
      //     it("detaches from reduce listeners", function(done) {
      //       var data = promisefilter([0, 1, 2]),
      //           callback, // indicates a reduce has occurred in this group
      //           dimension = data.dimension(function(d) { return d; }),
      //           other = data.dimension(function(d) { return d; }),
      //           group = dimension
      //             .group(function(d) { return d; })
      //             .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
      //       group.all(); // force this group to be reduced when filters change
      //       callback = false;
      //       group.dispose();
      //       other.filterRange([1, 2]);
      //       assert.isFalse(callback).then(done);
      //     });
      //     it("detaches from add listeners", function(done) {
      //       var data = promisefilter([0, 1, 2]),
      //           callback, // indicates data has been added and the group has been reduced
      //           dimension = data.dimension(function(d) { return d; }),
      //           group = dimension
      //             .group(function(d) { return d; })
      //             .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
      //       group.all(); // force this group to be reduced when filters change
      //       callback = false;
      //       group.dispose();
      //       data.add([3, 4, 5]);
      //       assert.isFalse(callback).then(done);
      //     });
      //   });
      // });

      describe("dispose", function() {
// These tests with callbacks don't work in the async API
    //     it("detaches from add listeners", function() {
    //       var data = promisefilter([0, 1, 2]),
    //           callback, // indicates a reduce has occurred in this group
    //           dimension = data.dimension(function(d) { callback = true; return d; });
    //       callback = false;
    //       dimension.dispose();
    //       data.add([3, 4, 5]);
    //       assert.isFalse(callback);
    //     });
    //     it("detaches groups from reduce listeners", function() {
    //       var data = promisefilter([0, 1, 2]),
    //           callback, // indicates a reduce has occurred in this group
    //           dimension = data.dimension(function(d) { return d; }),
    //           other = data.dimension(function(d) { return d; }),
    //           group = dimension
    //             .group(function(d) { return d; })
    //             .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
    //       group.all(); // force this group to be reduced when filters change
    //       callback = false;
    //       dimension.dispose();
    //       other.filterRange([1, 2]);
    //       assert.isFalse(callback);
    //     });
    //     it("detaches groups from add listeners", function() {
    //       var data = promisefilter([0, 1, 2]),
    //           callback, // indicates data has been added and the group has been reduced
    //           dimension = data.dimension(function(d) { return d; }),
    //           group = dimension
    //             .group(function(d) { return d; })
    //             .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
    //       group.all(); // force this group to be reduced when filters change
    //       callback = false;
    //       dimension.dispose();
    //       data.add([3, 4, 5]);
    //       assert.isFalse(callback);
    //     });
        it("clears dimension filters from groups", function(done) {
          var data = promisefilter([0, 0, 2, 2]),
              d1 = data.dimension(function(d) { return -d; }),
              d2 = data.dimension(function(d) { return +d; }),
              g2 = d2.group(function(d) { return Math.round( d / 2 ) * 2; }),
              all = g2.all();
          d1.filterRange([-1, 1]); // a filter is present when the dimension is disposed
          d1.dispose();
          assert.deepEqual(g2.all(), [{key: 0, value: 2}, {key: 2, value: 2}]).then(done);
        });
      });
    });

    describe("groupAll", function() {
      beforeEach(function() {
        data.allGrouped = data.groupAll().reduceSum(function(d) { return d.total; });
      });

      it("does not have top and order methods", function(done) {
        assert.isFalse("top" in data.allGrouped);
        assert.isFalse("order" in data.allGrouped).then(done);
      });

      describe("reduce", function() {
        it("determines the computed reduce value", function(done) {
          try {
            data.allGrouped.reduceCount();
            assert.strictEqual(data.allGrouped.value(), 43);
          } finally {
            data.allGrouped.reduceSum(function(d) { return d.total; });
            data.date.filterAll().then(done);
          }
        });

        describe("gives reduce functions information on lifecycle of data element", function() {
          var data;
          beforeEach(function() {
            data = promisefilter();
            data.add([{foo: 1, val: 2}, {foo: 2, val: 2}, {foo: 3, val: 2}, {foo: 3, val: 2}]);
            data.foo = data.dimension(function(d) { return d.foo; });
            data.bar = data.dimension(function(d) { return d.foo; });
            data.val = data.dimension(function(d) { return d.val; });
            data.groupMax = data.groupAll().reduce(function(p,v,n){
              if(n) {
                p += v.val;
              }
              return p;
            }, function(p,v,n) {
              if(n) {
                p -= v.val;
              }
              return p;
            }, function() {
              return 0;
            });
            data.groupSum = data.groupAll().reduceSum(function(d) { return d.val; });
          });
          it("on group creation", function(done) {
            assert.deepEqual(data.groupMax.value(), data.groupSum.value()).then(done);
          });
          it("on filtering", function(done) {
            data.foo.filterRange([1, 3]);
            assert.deepEqual(data.groupMax.value(), 8);
            assert.deepEqual(data.groupSum.value(), 4);
            data.foo.filterAll().then(done);
          });
          it("on adding data after group creation", function(done) {
            data.add([{foo: 1, val: 2}]);
            assert.deepEqual(data.groupMax.value(), data.groupSum.value()).then(done);
          });
          it("on adding data when a filter is in place", function(done) {
            data.foo.filterRange([1,3]);
            data.add([{foo: 3, val: 1}]);
            assert.deepEqual(data.groupMax.value(), 9);
            assert.deepEqual(data.groupSum.value(), 4);
            data.foo.filterAll().then(done);
          });
          it("on removing data after group creation", function(done) {
            data.val.filter(1);
            data.remove();
            assert.deepEqual(data.groupMax.value(), 8);
            assert.deepEqual(data.groupSum.value(), 0);

            data.val.filterAll();
            assert.deepEqual(data.groupMax.value(), data.groupSum.value()).then(done);
          });
        });
      });

      describe("value", function() {
        it("returns the sum total of matching records", function(done) {
          assert.strictEqual(data.allGrouped.value(), 6660).then(done);
        });
        it("observes all dimension's filters", function(done) {
          try {
            data.type.filterExact("tab");
            assert.strictEqual(data.allGrouped.value(), 4760);
            data.type.filterExact("visa");
            assert.strictEqual(data.allGrouped.value(), 1400);
            data.tip.filterExact(100);
            assert.strictEqual(data.allGrouped.value(), 1000);
          } finally {
            data.type.filterAll();
            data.tip.filterAll().then(done);
          }
        });
      });

      // These callback-based approaches don't work with the async API
    //   describe("dispose", function() {
    //     it("detaches from reduce listeners", function() {
    //       var data = promisefilter([0, 1, 2]),
    //           callback, // indicates a reduce has occurred in this group
    //           other = data.dimension(function(d) { return d; }),
    //           all = data.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
    //       all.value(); // force this group to be reduced when filters change
    //       callback = false;
    //       all.dispose();
    //       other.filterRange([1, 2]);
    //       assert.isFalse(callback);
    //     });
    //     it("detaches from add listeners", function() {
    //       var data = promisefilter([0, 1, 2]),
    //           callback, // indicates data has been added and triggered a reduce
    //           all = data.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
    //       all.value(); // force this group to be reduced when data is added
    //       callback = false;
    //       all.dispose();
    //       data.add([3, 4, 5]);
    //       assert.isFalse(callback);
    //     });
    //   });
    });

    describe("size", function() {
      it("returns the total number of elements", function(done) {
        assert.equal(data.size(), 43).then(done);
      });
      it("is not affected by any dimension filters", function(done) {
        try {
          data.quantity.filterExact(4);
          assert.equal(data.size(), 43);
        } finally {
          data.quantity.filterAll().then(done);
        }
      });
    });

    describe("all", function() {
      it("returns the full data array", function(done) {
        var raw = data.all();
        assert.equal(raw.then(function(a) { return a.length; }), 43).then(done);
      });
      it("is not affected by any dimension filters", function(done) {
        try {
          data.quantity.filterExact(4);
          var raw = data.all();
          assert.equal(raw.then(function(a) { return a.length; }), 43);
        } finally {
          data.quantity.filterAll().then(done);
        }
      });
    });

    describe("add", function() {
      it("increases the size of the promisefilter", function(done) {
        var data = promisefilter([]);
        assert.equal(data.size(), 0);
        data.add([0, 1, 2, 3, 4, 5, 6, 6, 6, 7]);
        assert.equal(data.size(), 10);
        data.add([]);
        assert.equal(data.size(), 10).then(done);
      });
      it("existing filters are consistent with new records", function(done) {
        var data = promisefilter([]),
            foo = data.dimension(function(d) { return +d; }),
            bar = data.dimension(function(d) { return -d; });
        assert.deepEqual(foo.top(Infinity), []);
        foo.filterExact(42);
        data.add([43, 42, 41]);
        assert.deepEqual(foo.top(Infinity), [42]);
        assert.deepEqual(bar.top(Infinity), [42]);
        data.add([43, 42]);
        assert.deepEqual(foo.top(Infinity), [42, 42]);
        assert.deepEqual(bar.top(Infinity), [42, 42]);
        foo.filterRange([42, 44]);
        data.add([43]);
        assert.deepEqual(foo.top(Infinity), [43, 43, 43, 42, 42]);
        assert.deepEqual(bar.top(Infinity), [42, 42, 43, 43, 43]);
        foo.filterFunction(function(d) { return d % 2 === 1; });
        data.add([44, 44, 45]);
        assert.deepEqual(foo.top(Infinity), [45, 43, 43, 43, 41]);
        assert.deepEqual(bar.top(Infinity), [41, 43, 43, 43, 45]);
        bar.filterExact([-43]);
        assert.deepEqual(bar.top(Infinity), [43, 43, 43]);
        data.add([43]);
        assert.deepEqual(bar.top(Infinity), [43, 43, 43, 43]);
        bar.filterAll();
        data.add([0]);
        assert.deepEqual(bar.top(Infinity), [41, 43, 43, 43, 43, 45]);
        foo.filterAll();
        assert.deepEqual(bar.top(Infinity), [0, 41, 42, 42, 43, 43, 43, 43, 44, 44, 45]).then(done);
      });
      it("existing groups are consistent with new records", function(done) {
        var data = promisefilter([]),
            foo = data.dimension(function(d) { return +d; }),
            bar = data.dimension(function(d) { return -d; }),
            foos = foo.group(),
            all = data.groupAll();
        assert.equal(all.value(), 0);
        assert.deepEqual(foos.all(), []);
        foo.filterExact(42);
        data.add([43, 42, 41]);
        assert.equal(all.value(), 1);
        assert.deepEqual(foos.all(), [{key: 41, value: 1}, {key: 42, value: 1}, {key: 43, value: 1}]);
        bar.filterExact(-42);
        assert.equal(all.value(), 1);
        assert.deepEqual(foos.all(), [{key: 41, value: 0}, {key: 42, value: 1}, {key: 43, value: 0}]);
        data.add([43, 42, 41]);
        assert.equal(all.value(), 2);
        assert.deepEqual(foos.all(), [{key: 41, value: 0}, {key: 42, value: 2}, {key: 43, value: 0}]);
        bar.filterAll();
        assert.equal(all.value(), 2);
        assert.deepEqual(foos.all(), [{key: 41, value: 2}, {key: 42, value: 2}, {key: 43, value: 2}]);
        foo.filterAll();
        assert.equal(all.value(), 6).then(done);
      });
      it("can add new groups that are before existing groups", function(done) {
        var data = promisefilter(),
            foo = data.dimension(function(d) { return +d; }),
            foos = foo.group().reduce(add, remove, initial).order(order);
        data.add([2]).add([1, 1, 1]);
        assert.deepEqual(foos.top(2), [{key: 1, value: {foo: 3}}, {key: 2, value: {foo: 1}}]).then(done);
        function order(p) { return p.foo; }
        function add(p, v) { ++p.foo; return p; }
        function remove(p, v) { --p.foo; return p; }
        function initial() { return {foo: 0}; }
      });
      it("can add more than 256 groups", function(done) {
        var data = promisefilter(),
            foo = data.dimension(function(d) { return +d; }),
            bar = data.dimension(function(d) { return +d; }),
            foos = foo.group();
        data.add(d3.range(0, 256));
        assert.deepEqual(foos.all().then(function (a) { return a.map(function(d) { return d.key; }); }), d3.range(0, 256));
        assert.isTrue(foos.all().then(function(a) { return a.every(function(d) { return d.value == 1; }); }));
        data.add([128]);
        assert.deepEqual(foos.top(1), [{key: 128, value: 2}]);
        bar.filterExact(0);
        data.add(d3.range(-256, 0));
        assert.deepEqual(foos.all().then(function (a) { return a.map(function(d) { return d.key; }); }), d3.range(-256, 256));
        assert.deepEqual(foos.top(1), [{key: 0, value: 1}]).then(done);
      });
      // Doesn't work with the async API due to lack of context
      // it("can add lots of groups in reverse order", function(done) {
      //   var data = promisefilter(),
      //       foo = data.dimension(function(d) { return -d.foo; }),
      //       bar = data.dimension(function(d) { return d.bar; }),
      //       foos = foo.group(Math.floor).reduceSum(function(d) { return d.foo; });
      //   bar.filterExact(1);
      //   for (var i = 0; i < 1000; i++) {
      //     data.add(d3.range(10).map(function(d) {
      //       return {foo: i + d / 10, bar: i % 4, baz: d + i * 10};
      //     }));
      //   }
      //   assert.deepEqual(foos.top(1), [{key: -998, value: 8977.5}]).then(done);
      // });
    });
    describe("remove", function() {
      var data;
      beforeEach(function() {
        data = promisefilter();
        data.foo = data.dimension(function(d) { return d.foo; });
        data.foo.div2 = data.foo.group(function(value) { return Math.floor(value / 2); });
        data.foo.positive = data.foo.group(function(value) { return value > 0 | 0; });
      });
      it("removing a record works for a group with cardinality one", function(done) {
        data.add([{foo: 1}, {foo: 1.1}, {foo: 1.2}]);
        data.foo.filter(1.1);
        data.remove();
        data.foo.filterAll();
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []).then(done);
      });
      it("removing a record works for another group with cardinality one", function(done) {
        data.add([{foo: 0}, {foo: -1}]);
        assert.deepEqual(data.foo.positive.all(), [{key: 0, value: 2}]);
        data.foo.filter(0);
        data.remove();
        assert.deepEqual(data.foo.positive.all(), [{key: 0, value: 1}]);
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: -1}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []).then(done);
      });
      it("removing a record updates dimension", function(done) {
        data.add([{foo: 1}, {foo: 2}]);
        data.foo.filterExact(1);
        data.remove();
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: 2}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []).then(done);
      });
      it("removing records updates group", function(done) {
        data.add([{foo: 1}, {foo: 2}, {foo: 3}]);
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}, {foo: 2}, {foo: 1}]);
        assert.deepEqual(data.foo.div2.all(), [{key: 0, value: 1}, {key: 1, value: 2}]);
        data.foo.filterRange([1, 3]);
        data.remove();
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}]);
        assert.deepEqual(data.foo.div2.all(), [{key: 1, value: 1}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
        assert.deepEqual(data.foo.div2.all(), []).then(done);
      });
      it("filtering works correctly after removing a record", function(done) {
        data.add([{foo: 1}, {foo: 2}, {foo: 3}]);
        data.foo.filter(2);
        data.remove();
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}, {foo: 1}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []).then(done);
      });
    });
  });
});

function key(d) {
  return d.key;
}