import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el!);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>TESTTTTTT</h1>
        <CellList />
      </div>
    </Provider>
  );
};

root.render(<App />);

// import React from 'react';
// import ReactDOM from 'react-dom';

// const App = () => {
//   <h1>Hi there!</h1>;
// };

// ReactDOM.render(<App />, document.querySelector('#root'));
