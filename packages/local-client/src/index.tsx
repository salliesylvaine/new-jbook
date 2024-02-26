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
          <h1>Welcome to JS Notebook-377!</h1>
          <h4>
            An interactive development environment for writing and documenting
            JavaScript code.
          </h4>
          <br />
          <h3 style={{ fontWeight: 'bold' }}>Getting Started:</h3>
          <h4 style={{ fontWeight: 'bold' }}>
            ** For the most comprehensive documentation and usage instructions,
            please refer to the README at
            <a
              href="https://www.npmjs.com/package/jsnotebook-377"
              style={{ textDecoration: 'underline' }}
            >
              JSNotebook-377
            </a>
            **
          </h4>

          <ul>
            <li>
              Click the Code button to open a Code Editor. Click the Text button
              to open a Text Editor.
            </li>
            <li>
              You can re-order or delete editors using the buttons at the top
              right of each editor window.
            </li>
            <li>
              You can add new editors by hovering on the divider between
              editors.
            </li>
            <li>
              Call the "show()" function, passing in your desired code as an
              argument, to view said code in the preview window on the right of
              the Code Editor.
            </li>
            <li>
              You can reference any code you've written in any code editor
              window. This saves you the hassle of having to re-write the same
              code in multiple code editors.
            </li>
            <li>
              Everything you write in both the code editors and text editors are
              saved to a JavaScript file that is automatically created inside
              your project directory on your local computer.
            </li>
          </ul>
          <p>
            Any other questions you have can be answered in the README at
            <a
              href="https://www.npmjs.com/package/jsnotebook-377"
              style={{ textDecoration: 'underline' }}
            >
              JSNotebook-377
            </a>
            .
          </p>
          <p>Happy coding! </p>
        </section>
        <CellList />
      </div>
    </Provider>
  );
};

root.render(<App />);
