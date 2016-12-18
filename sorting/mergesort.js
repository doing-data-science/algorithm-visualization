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

  function merge(left, right, cmp) {
    var result = [];
    while (left.length && right.length) {
      if (cmp(left[0], right[0]) < 0) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    return result.concat(left).concat(right);
  }

  function mergeSort(array, cmp, handle) {
    cmp = cmp || comparator;
    handle = handle || loop;

    if (array.length < 2) {
      return array;
    }

    var work = [];
    for (var i = 0; i < array.length; i++) {
      work.push([array[i]]);
    }
    work.push([]);
    handle(array, 0);

    for (var lim = array.length; lim > 1; lim = Math.floor((lim + 1) / 2)) {
      for (var j = 0,k = 0; k < lim; j++, k += 2) {
        work[j] = merge(work[k], work[k + 1], cmp);
        var num = 0;
        var arr = [];
        for (var i = 0; i < work.length; i++) {
          var temp = work[i];
          arr = arr.concat(temp);
          num += temp.length;
          if (num === array.length) {
            handle(arr, lim);
            num = 0;
            arr = [];
          }
        }
      }
      work[j] = [];
    }
    return work[0];
  }

  exports.mergeSort = mergeSort;

});
