const grid = require('./grid.js');

const daZone = document.querySelector(`#da-zone`);
const rowsControls = document.querySelector(`#rows-control`);
const columnsControls = document.querySelector(`#columns-control`);
const savedGrids = document.querySelector(`#saved-grids`);

const globalState = {
  activeGrid: {
    rows: ['1fr', '1fr'],
    columns: ['1fr', '1fr'],
    gridWidth: '800px',
    gridHeight: '450px',
    id: 0
  },
  grids: [],
};

render(globalState);
window.dispatch = dispatch;
function dispatch(event) {
  let count = 0;

  switch(event.type) {

    case 'UPDATE_ROWS':
      const rowSize = event.payload.size || '1fr';
      globalState.activeGrid.rows = [];

      while (count < event.payload.number) {
        globalState.activeGrid.rows.push(rowSize);
        count++;
      }
      break;
    case 'UPDATE_COLUMNS':
      const columnSize = event.payload.size || '1fr';
      globalState.activeGrid.columns = [];

      while (count < event.payload.number) {
        globalState.activeGrid.columns.push(columnSize);
        count++;
      }
      break;
    case 'UPDATE_ROW':
      // should check for valid values
      globalState.activeGrid.rows[event.payload.id] = event.payload.value;
      break;
    case 'UPDATE_COLUMN':
      // should check for valid values
      globalState.activeGrid.columns[event.payload.id] = event.payload.value;
      break;
    case 'SET_GRID_WIDTH':
      // should check for valid values
      globalState.activeGrid.gridWidth = event.payload;
      break;
    case 'SET_GRID_HEIGHT':
      // should check for valid values
      globalState.activeGrid.gridHeight = event.payload;
      break;
    case 'SAVE_GRID':
      globalState.grids[globalState.activeGrid.id] = globalState.activeGrid;
      break;
    case 'NEW_GRID':
      const newGrid = JSON.parse(JSON.stringify(globalState.activeGrid));
      newGrid.id = newGrid.id+1;
      globalState.grids[newGrid.id] = newGrid;
      globalState.activeGrid = newGrid;
      break;
    case 'LOAD_GRID':
      // should check for valid values
      globalState.activeGrid = globalState.grids[event.payload];
      break;
    default:

      break;
  }
  render(globalState);
}

function render(state) {
  daZone.innerHTML = '';
  rowsControls.innerHTML = '';
  columnsControls.innerHTML = '';
  savedGrids.innerHTML = '';

  // Grid
  const gridDiv = grid(state.activeGrid);
  daZone.appendChild(gridDiv);

  // Control Panel
  // Render Row Controls
  state.activeGrid.rows
    .map(rowControl)
    .forEach(x => {
      rowsControls.appendChild(x);
    });

  // Render Column Controls
  state.activeGrid.columns
    .map(columnControl)
    .forEach(x => {
      columnsControls.appendChild(x);
    });

  // Saved grids
  savedGrids.appendChild(savedGridButtons(state.grids));
}

function savedGridButtons(grids) {
  const div = document.createElement('div');
  div.innerHTML = `${grids.map(g => {
    return `<button onclick="window.dispatch({type: 'LOAD_GRID', payload: ${g.id}})">${g.id}</button>`
  })}`;

  return div;
}

function rowControl(row, id) {
  const div = document.createElement('div');
  div.innerHTML = `
    <label for="row-control-${id}">Row ${id}:
      <input type="text"
             name="row-${id}"
             onblur="window.dispatch({type:'UPDATE_ROW', payload: {id: ${id}, value}})"
             placeholder="${row}">
    </label>
  `;
  return div;
}

function columnControl(column, id) {
  const div = document.createElement('div');
  div.innerHTML = `
    <label for="column-control-${id}">Column ${id}:
      <input type="text"
             name="column-${id}"
             onblur="dispatch({type:'UPDATE_COLUMN', payload: {id: ${id}, value}})"
             placeholder="${column}">
    </label>
  `;
  return div;
}
