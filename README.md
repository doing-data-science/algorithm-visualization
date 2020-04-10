# Algorithm Collection [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

[travis-image]: https://img.shields.io/travis/doing-data-science/algorithm-visualization.svg?style=flat-square
[travis-url]: https://travis-ci.org/doing-data-science/algorithm-visualization
[coveralls-image]: https://img.shields.io/coveralls/doing-data-science/algorithm-visualization.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/doing-data-science/algorithm-visualization?branch=master

---

Visualization and Audibilization of algorithms.

### [Live demo](//doing-data-science.github.io/algorithm-visualization)

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|
| :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Mon Aug 19 2019 10:30:56 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## Sorting algorithms

| Sorting algorithms | Time complexity | Space complexity | Stability |
| ------------------ | --------------- | ---------------- | --------- |
| Bubble sort        | O(n^2)          | O(1)             | yes       |
| Bucket sort        | O(n+k)          | O(n*k)           | yes       |
| Heap sort          | O(nlogn)        | O(1)             | no        |
| Insertion sort     | O(n^2)          | O(1)             | yes       |
| Merge sort         | O(nlogn)        | O(n)             | yes       |
| Quick sort         | O(nlogn)        | O(1)             | no        |
| Selection sort     | O(n^2)          | O(1)             | no        |
| Shell sort         | O(nlog^2n)      | O(1)             | no        |
| Bogo sort          | O(n·n!)[∞]      | O(n)             | yes       |

```
Time complexity(Average)
Space complexity(Auxiliary)
```

## Graph[TODO]

- Minimum Cost Spanning Tree
  - Prim
  - Kruskal
- Shortest Paths Problem
  - Dijkstra
- Topological Sort
- [Astar](//github.com/xudafeng/AStar) [demo](//pillowjs.github.io/pillow-sample/astar/)
- Data mining
  - Cluster Analysis
  - Decision Tree
  - Artificial Neural Network
  - Naive Bayes classifier
  - k-Nearest Neighbor
- Image Transformation
  - Binaryzation & Gray Level [demo](//doing-data-science.github.io/algorithm-visualization/image-transformation.html)
  - svm [demo](//doing-data-science.github.io/algorithm-visualization/svm.html)

## Data Structures[TODO]

- [BinaryHeap](//github.com/doing-data-science/BinaryHeap)
- [LinkedList](//github.com/xudafeng/autoresponsive-common)

---

## Test Coverage

```bash
$ npm i
$ npm run test
```

## Thanks To

- [monitor.js](//pillowjs.github.io/monitor.js)

## License

MIT Licensed.
