import { Dispatch, Middleware } from 'redux';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { saveCells } from '../action-creators';
import { RootState } from '../reducers';

//* Middleware is a function that returns a function that returns a function...

// i typed this with : Middleware<Dispatch<Action>>, he did not.
export const persistMiddleware: Middleware<Dispatch<Action>> = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  // i typed this with : NodeJS.Timeout, he typed with : any
  let timer: NodeJS.Timeout;

  return (next: (action: Action) => void) => {
    // i typed action: any, he typed with action: Action
    return (action: any) => {
      next(action);
      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        //* receiving the function that we get back from saveCells
        //* and then immediately call the one we get back with dispatch
        //* this is bc we wired up saveCells as though it were an action creator
        //* to be used with redux thunk
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
