function update(field, value) {
  console.log(Number(value));

  value = Number(value);
  if (isNaN(value)) return;

  const updateType = (field === 'rows') ? 'UPDATE_ROWS' : 'UPDATE_COLUMNS';

  dispatch({type:updateType, payload: {number: value, size: '1fr'}});
}
