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

  function partition(array, left, right, comparator, handle) {
    var pivot = array[right - 1];
    var minEnd = left;
    for (var maxEnd = left; maxEnd < right - 1; maxEnd++) {
      if (comparator(array[maxEnd], pivot) < 0) {
        swap(array, maxEnd, minEnd);
        minEnd++;
        handle(array, maxEnd);
      }
    }
    swap(array, minEnd, right - 1);
    return minEnd;
  }

  function _quickSort(array, left, right, cmp, handle) {
    if (left < right) {
      var p = partition(array, left, right, cmp, handle);
      _quickSort(array, left, p, cmp, handle);
      _quickSort(array, p + 1, right, cmp, handle);
    }
    return array;
  }

  function quickSort(array, cmp, handle) {
    cmp = cmp || comparator;
    handle = handle || loop;
    return _quickSort(array, 0, array.length, cmp, handle);
  }

  exports.quickSort = quickSort;

});
