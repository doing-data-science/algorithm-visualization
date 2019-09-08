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

  var selectionSort = function (array, cmp, handle) {
    cmp = cmp || comparator;
    handle = handle || loop;
    for (var i = 0; i < array.length; i++) {
      var index = i;
      for (var j = i + 1; j < array.length; j++) {
        if (cmp(array[index], array[j]) > 0) {
          index = j;
        }
      }
      swap(array, i, index);
      handle(array, array[i]);
    }
    return array;
  };

  exports.selectionSort = selectionSort;

});
