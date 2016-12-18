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

  function shellSort(array, cmp, handle) {
    cmp = cmp || comparator;
    handle = handle || loop;
    for (var gap = array.length >> 1; gap > 0; gap >>= 1) {
      for (var i = gap; i < array.length; i++) {
        var temp = array[i];
        for (var j = i - gap; j >= 0 && cmp(array[j], temp) > 0; j -= gap) {
          array[j + gap] = array[j];
          handle(array, array[j]);
        }
        array[j + gap] = temp;
      }
    }

    return array;
  };

  exports.shellSort = shellSort;

});
