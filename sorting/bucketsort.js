(function(root, factory) {
  if (typeof exports !== 'undefined') {
    return factory(exports);
  } else {
    factory(root['sorting'] || (root['sorting'] = {}));
  }
})(this, function(exports) {

  function loop() {
  }

  function comparator(a, b) {
    return a - b;
  }

  function insertionSort(buckets, current, handle) {
    var currentBucket = buckets[current];
    for (var i = 1; i < currentBucket.length; i++) {
      var current = currentBucket[i];
      var j = i - 1;
      while (j >= 0 && current < currentBucket[j]) {
        currentBucket[j + 1] = currentBucket[j];
        j--;
      }
      currentBucket[j + 1] = current;

      var array = [];
      buckets.forEach(currentBucket => {
        array = array.concat(currentBucket);
      });
      handle(array, current);
    }
  }

  function createBuckets(array) {
    var buckets = [];
    for (var i = 0; i < array.length; i++) {
      var current = array[i];
      var currentBucket = Math.floor(current);
      buckets[currentBucket] = buckets[currentBucket] || [];
      buckets[currentBucket].push(current);
    }
    return buckets;
  }

  function bucketSort(array, cmp, handle) {
    cmp = cmp || comparator;
    handle = handle || loop;
    var buckets = createBuckets(array);
    var result = [];
    for (var i = 0; i < buckets.length; i++) {
      var currentBucket = buckets[i];
      if (currentBucket) {
        insertionSort(buckets, i, handle);
        result = result.concat(currentBucket);
      }
    }
    return result;
  }

  exports.bucketSort = bucketSort;

});
