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

  function heapify(array, index, heapSize, cmp, handle) {
    var left = 2 * index + 1;
    var right = 2 * index + 2;
    var largest = index;

    if (left < heapSize && cmp(array[left], array[index]) > 0) {
      largest = left;
    }

    if (right < heapSize && cmp(array[right], array[largest]) > 0) {
      largest = right;
    }

    if (largest !== index) {
      swap(array, index, largest);
      heapify(array, largest, heapSize, cmp, handle);
      handle(array, array[largest]);
    }
  }

  function buildMaxHeap(array, cmp, handle) {
    for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
      heapify(array, i, array.length, cmp, handle);
    }
    return array;
  }

  function heapSort(array, cmp, handle) {
    cmp = cmp || comparator;
    handle = handle || loop;
    var size = array.length;
    buildMaxHeap(array, cmp, handle);
    for (var i = array.length - 1; i > 0; i--) {
      swap(array, 0, i);
      size--;
      heapify(array, 0, size, cmp, handle);
    }
    return array;
  };

  exports.heapSort = heapSort;

});
