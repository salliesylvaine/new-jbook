import cellsReducer from './cellsReducer';
import { combineReducers } from 'redux';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducers;

//* this defines/describes the overall structure of the state object
//* inside our redux store (applying types to React Redux)
export type RootState = ReturnType<typeof reducers>;
