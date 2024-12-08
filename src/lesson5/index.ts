function bsInsert<T extends unknown>(lst: T[], item: T) {
  let l = 0;
  let r = lst.length - 1;
  while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if ((lst[m] as any)[0] < (item as any)[0]) {
          l = m + 1;
      } else {
          r = m - 1;
      }
  }
  lst.splice(l, 0, item);
}

class Graph {
  n: number;
  dots: Array<Array<[number, number]>>;

  constructor(n: number) {
      this.n = n;
      this.dots = Array.from({ length: n }, () => []);
  }

  addRoad(u: number, v: number, weight: number) {
      this.dots[u].push([v, weight]);
      this.dots[v].push([u, weight]);
  }

  dijkstra(start: number): number[] {
      const distances: number[] = Array(this.n).fill(1000001);
      distances[start] = 0;
      const q: [number, number][] = [[0, start]];

      while (q.length > 0) {
          const [currentDistance, currentDot] = q.shift()!;

          if (currentDistance > distances[currentDot]) {
              continue;
          }

          for (const [neighbor, weight] of this.dots[currentDot]) {
              const distance = currentDistance + weight;
              if (distance < distances[neighbor]) {
                  distances[neighbor] = distance;
                  bsInsert(q, [distance, neighbor]);
              }
          }
      }

      return distances;
  }

  private _fw(): number[][] {
      const matrix: number[][] = Array.from(
          { length: this.n },
          () => Array(this.n).fill(1000001),
      );

      for (let i = 0; i < this.n; ++i) {
          matrix[i][i] = 0;
      }

      for (let u = 0; u < this.n; ++u) {
          for (const [v, weight] of this.dots[u]) {
              matrix[u][v] = weight;
          }
      }

      for (let k = 0; k < this.n; ++k) {
          for (let i = 0; i < this.n; ++i) {
              for (let j = 0; j < this.n; ++j) {
                  if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
                      matrix[i][j] = matrix[i][k] + matrix[k][j];
                  }
              }
          }
      }

      return matrix;
  }

  findCenter(): number {
      const matrix = this._fw();

      let minMax = 1000001;
      let center = 0;

      for (let i = 0; i < this.n; ++i) {
          const maxValue = Math.max(...matrix[i]);
          if (maxValue < minMax) {
              minMax = maxValue;
              center = i;
          }
      }

      return center;
  }
}

// Пример использования
// const n: number = parseInt(prompt("Введите количество вершин:"))!;
// const m: number = parseInt(prompt("Введите количество ребер:"))!;
// const graph = new Graph(n);

// for (let i = 0; i < m; ++i) {
//     const [u, v, weight] = prompt(`Введите ${i+1}-е ребро (u, v, вес):`).split(' ').map(Number);
//     graph.addRoad(u - 1, v - 1, weight);
// }

// console.log(graph.findCenter() + 1);