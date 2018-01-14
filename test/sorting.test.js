'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

var sortingFiles = fs.readdirSync(path.join(__dirname, '..', 'sorting'));
var sorting = {};

sortingFiles.map(file => {
  try {
    Object.assign(sorting, require(`../sorting/${file}`));
  } catch (e) {
  }
});

function fibonacci(n) {
  return n < 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

var len = 10;
var array = [];

while (len--) {
  array.push(fibonacci(len));
}

describe('sorting', function() {

  it('bogoSort', function() {
    var res = sorting.bogoSort(array.slice(0));
    assert.notEqual(res, array.slice(0));
  });

  it('bubbleSort', function() {
    var res = sorting.bubbleSort(array.slice(0));
    assert.deepEqual(res.slice(0), array.slice(0).reverse());
    res = sorting.bubbleSort(array.slice(0), function(a, b) {
      return b - a;
    });
    assert.deepEqual(res.slice(0), array.slice(0));
  });

  it('bucketSort', function() {
    var res = sorting.bucketSort(array.slice(0));
    assert.deepEqual(res.slice(0), array.slice(0).reverse());
  });

  it('heapSort', function() {
    var res = sorting.heapSort(array.slice(0));
    assert.deepEqual(res.slice(0), array.slice(0).reverse());
  });

  it('insertionSort', function() {
    var res = sorting.insertionSort(array.slice(0));
    assert.deepEqual(res.slice(0), array.slice(0).reverse());
  });

  it('mergeSort', function() {
    var res = sorting.mergeSort(array.slice(0));
    assert.deepEqual(res.slice(0), array.slice(0).reverse());
  });

  it('quickSort', function() {
    var res = sorting.quickSort(array.slice(0));
    assert.deepEqual(res.slice(0), array.slice(0).reverse());
  });

  it('selectionSort', function() {
    var res = sorting.selectionSort(array.slice(0));
    assert.deepEqual(res.slice(0), array.slice(0).reverse());
  });

  it('shellSort', function() {
    var res = sorting.shellSort(array.slice(0));
    assert.deepEqual(res.slice(0), array.slice(0).reverse());
  });

});
