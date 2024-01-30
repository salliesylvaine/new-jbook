import './code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';

import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
//* how we pull state out of our store
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // const [input, setInput] = useState('');
  // const [code, setCode] = useState('');
  // const [err, setErr] = useState('');
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);

      // const output = await bundle(cell.content);
      //* this contains our transpiled and bundled code
      // setCode(output.code);
      // setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle]);

  //* transform means transpile in esbuild world
  //   const result = await ref.current.transform(input, {
  //     loader: 'jsx',
  //     target: 'es2015',
  //   });

  //* the eval() function is built into the browser. it's used to
  //* execute javascript that's stored inside of a string.
  // try {
  //   eval(result.outputFiles[0].text);
  // } catch (err) {
  //   alert(err);
  // }

  //* taking output of the bundling process, putting it into a script
  //* tag, and assigning it to the html variable
  // const html = `
  //   <script>${code}</script>
  // `;

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        {/* <pre>{code}</pre> */}
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

// import React from 'react';
// import ReactDOM from 'react-dom';

// const App = () => {
//   <h1>Hi there!</h1>;
// };

// ReactDOM.render(<App />, document.querySelector('#root'));
