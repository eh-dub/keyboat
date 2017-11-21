function grid(state) {
  const grid = document.createElement('div');
  // Here I have to synchronize the style and consider the implementation of updating style...
  // A relation could help separate these concerns
  grid.style.display = `grid`;
  grid.style.width = `${state.gridWidth}`;
  grid.style.height = `${state.gridHeight}`;
  grid.style.gridTemplateRows = `${state.rows.join(' ')}`;
  grid.style.gridTemplateColumns = ` ${state.columns.join(' ')}`;

  let count = 0;
  while(count < state.rows.length * state.columns.length) {
    const child = document.createElement('div');
    grid.appendChild(child);
    count++;
  }

  return grid;
}

module.exports = grid;
