const daZone = document.querySelector(`#da-zone`);

const globalState = {
  rows: [],
  columns: [],
};

function dispatch(event) {
  switch(event.type) {
    case 'UPDATE_ROWS':
      const rowSize = event.payload || '1fr';
      globalState.rows.push(rowSize);
      break;
    case 'UPDATE_COLUMNS':
      const columnSize = event.payload || '1fr';
      globalState.columns.push(columnSize);
      break;

    default:

      break;
  }
  render(globalState);
}

function render(state) {
  clearDaZone();

  const div = document.createElement('div');
  div.style.display = `grid`;
  div.style.height = `100%`;
  div.style.gridTemplateRows = `${state.rows.join(' ')}`;
  div.style.gridTemplateColumns = ` ${state.columns.join(' ')}`;

  let count = 0;
  while(count < state.rows.length * state.columns.length) {
    const child = document.createElement('div');
    div.appendChild(child);
    count++;
  }

  daZone.appendChild(div);
}

function clearDaZone() {
  while (daZone.hasChildNodes()) {
      daZone.removeChild(daZone.lastChild);
  }
}
