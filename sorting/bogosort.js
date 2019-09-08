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

  function swap(items, i, j) {
    var temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }

  function shuffle(array) {
    var len = array.length - 1;
    while (len--) {
      var random = Math.floor(Math.random() * len);
      swap(array, len, random);
    }
    return array;
  }

  function isSorted(array, cmp, handle) {
    for (var i = 1; i < array.length; i++) {
      handle(array, array[i]);
      if (cmp(array[i - 1], array[i]) > 0) {
        return false;
      }
    }
    return true;
  }

  function bogoSort(array, cmp, handle) {
    cmp = cmp || comparator;
    handle = handle || loop;
    var sorted;
    var number = array.length;
    while (number && !sorted) {
      array = shuffle(array);
      sorted = isSorted(array, cmp, handle);
      number--;
    }
    return array;
  }

  exports.bogoSort = bogoSort;

});
