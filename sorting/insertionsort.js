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

  function insertionSort(array, cmp, handle) {
    cmp = cmp || comparator;
    handle = handle || loop;
    for (var i = 1; i < array.length; i++) {
      var current = array[i];
      for (var j = i - 1; j >= 0 && (cmp(array[j], current) > 0); j--) {
        array[j + 1] = array[j];
      }
      handle(array, array[j + 1]);
      array[j + 1] = current;
    }

    return array;
  }

  exports.insertionSort = insertionSort;

});
