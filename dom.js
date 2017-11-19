function update(field, value) {
  console.log(Number(value));

  value = Number(value);
  if (isNaN(value)) return;

  const updateType = (field === 'rows') ? 'UPDATE_ROWS' : 'UPDATE_COLUMNS';

  let count = 0;
  while (count < value) {
    dispatch({type:updateType, payload: '1fr'});
    count++;
  }
}
