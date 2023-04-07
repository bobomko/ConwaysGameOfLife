const width = 50;
const height = 50;
const grid = createGrid(width, height);

function createGrid(width, height) {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
}

function renderGrid() {
  const gridContainer = document.getElementById('grid');
  gridContainer.innerHTML = '';
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = document.createElement('div');
      cell.className = grid[y][x] === 1 ? 'alive' : 'dead';
      cell.addEventListener('click', () => {
        grid[y][x] = grid[y][x] === 1 ? 0 : 1;
        renderGrid();
      });
      gridContainer.appendChild(cell);
    }
  }
}

function start() {
  const intervalId = setInterval(() => {
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const neighbors = getNeighbors(x, y);
        if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
          grid[y][x] = 0;
        } else if (cell === 0 && neighbors === 3) {
          grid[y][x] = 1;
        }
      });
    });
    renderGrid();
  }, 100);
  document.body.dataset.intervalId = intervalId;
}

function stop() {
  clearInterval(document.body.dataset.intervalId);
}

function reset() {
  stop();
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      grid[y][x] = 0;
    });
  });
  renderGrid();
}

function getNeighbors(x, y) {
  let count = 0;
  for (let yOffset = -1; yOffset <= 1; yOffset++) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      if (xOffset === 0 && yOffset === 0) {
        continue;
      }
      const neighborX = x + xOffset;
      const neighborY = y + yOffset;
      if (neighborX < 0 || neighborX >= width || neighborY < 0 || neighborY >= height) {
        continue;
      }
      count += grid[neighborY][neighborX];
    }
  }
  return count;
}
