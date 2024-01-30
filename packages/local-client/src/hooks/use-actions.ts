import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

//* helper hook for dispatching actions without having to rewrite this
//* every time
export const useActions = () => {
  const dispatch = useDispatch();

  //* useMemo is kind of like useState and useEffect put together.
  //* whenever dispatch changes, react will rerun the function inside
  //* useMemo. the return value will be the overall return value from
  //* the useMemo hook. this calculation is only done once, and then
  //* whenever something inside the array changes.

  //* this makes it so where we only bind our action creators one single time

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
