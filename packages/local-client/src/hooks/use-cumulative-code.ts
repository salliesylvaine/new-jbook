import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';

      var show = (value) => {
        const root = document.querySelector('#root');
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
          root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };


    `;

    const showFuncNoop = 'var show = () => {}';

    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        //* if this is a prior cell, then we want to add its code to
        //* the cumulative array
        cumulativeCode.push(c.content);
      }

      //* pick up all the code from the previous cells and the current,
      //* then at that point stop the iteration
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
};
