import express from 'express';
import fs from 'fs/promises';
//* fs is included in the node standard library, used for saving/loading files on/off hard drive
//* the default module operates using callback functions that all involve asynchronous code.
//* the promises submodule is the same thing except all the functions return Promises instead.
//* this allows us to write out async/await code instead of relying on callbacks
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  //* router has methods on it (ex. get, post, delete) that help wire middlewares and so on
  const router = express.Router();
  // Body-parsing middleware for req.body
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };

    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
      // console.log("youre getting a response: ", response);
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          // Add code to create a file and add default cells
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.send([]);
        }
      } else {
        // console.log('youre getting an error: ', err)
        throw err;
      }
    }

    // If read throws error, inspect error to see if the file doesn't exist

    // Parse a list of cells out of it
    // Send list of cells back to browser
  });

  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request object
    // Serialize them
    const { cells }: { cells: Cell[] } = req.body;

    // Write the cells into the file (utf-8 = plain text)
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};
