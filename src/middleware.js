export const logger = store => next => action => {
  console.log(action);
  console.log('previous state', store.getState());
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}