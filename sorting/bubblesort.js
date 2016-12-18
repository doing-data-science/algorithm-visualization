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

  function bubbleSort(array, cmp, handle) {
    cmp = cmp || comparator;
    handle = handle || loop;
    for (var i = 0; i < array.length - 1; i++) {
      for (var j = 0; j < array.length - 1 - i; j++) {
        if (cmp(array[j], array[j + 1]) > 0) {
          handle(array, array[j]);
          swap(array, j, j + 1);
        } else {
          handle(array, array[j + 1]);
        }
      }
    }
    return array;
  }

  exports.bubbleSort = bubbleSort;

});
