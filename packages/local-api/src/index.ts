import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  // wiring up the express router
  app.use(createCellsRouter(filename, dir));

  /* TWO DIFFERENT WAYS OF SERVING UP OUR REACT ASSETS */

  if (useProxy) {
    //! This one is intended for whenever we are running our application in a development mode
    //! and we have an actual create-react-app server running
    app.use(
      createProxyMiddleware({
        target: 'http://127.0.0.1:3000',
        //* ws = web sockets
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    //! This one is intended for when a user has installed our CLI on their local machine
    //* this will find the local-client build directory in node_modules folder
    const packagePath = require.resolve(
      '@jsnotebook-377/local-client/build/index.html'
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  //* we're taking the entire process of starting up an express server and
  //* wrapping it inside of our own custom Promise. this brings express into
  //* the async/await syntax
  return new Promise<void>((resolve, reject) => {
    //* if we successfully start up our server, the resolve function will be
    //* called automatically, resolving our Promise.
    //* if something goes wrong, the reject function runs and will cause the try/catch block
    //* in the serveCommand in the cli to capture the error and end up in the catch statement
    app.listen(port, resolve).on('error', reject);
  });
};
