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
      <div className="content">
        <section className="section">
          <h1>JS Notebook</h1>
          <h3>A simple interactive coding environment.</h3>
          <p>How to use:</p>

          <ul>
            <li>Click the Code or Text button to add and edit cells.</li>
            <li>
              {' '}
              The code in each code editor is joined together in a single file.
            </li>{' '}
            <li>
              You can reference any code you've written in any code cell.{' '}
            </li>{' '}
            <li>
              Call the "show()" function to run your code in the preview box.{' '}
            </li>{' '}
            <li>
              You can re-order or delete cells using the buttons at the top
              right of each cell.
            </li>{' '}
            <li>
              {' '}
              You can add new cells by hovering on the divider between cells.
            </li>
          </ul>
          <p>
            Your changes get saved to the file you opened JS Notebook with.
            Happy coding!{' '}
          </p>
        </section>
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
