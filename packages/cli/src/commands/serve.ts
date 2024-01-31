//* path is part of the node standard library. it contains functions that
//* help us calculate different paths on a file system
import path from 'path';
import { Command } from 'commander';
import { serve } from '@jsnotebook-377/local-api';

interface LocalApiError {
  code: string;
}

//* if isProduction is true, it means we're probs running on the user's machine
const isProduction = process.env.NODE_ENV === 'production';
//* before we take this code and deploy to npm, we're going to run this script.
//* this script will find (inside our raw JS file) "process.env.NODE_ENV". it will
//* replace it with "production". this will make isProduction always true
//* but when we're running on our local machine, "process.env.NODE_ENV" will, at least,
//* not be equal to "production" and isProduction will be false.

export const serveCommand = new Command()
  //* square brackets tell Commander that it's an optional value
  .command('serve [filename]')
  .description('Open a file for editing')
  //* params for .option are 1: different options, 2: describing options, 3: default value (port)
  //* angled brackets (<>) indicate a required value
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };

    try {
      //* calculates the directory variable
      const dir = path.join(process.cwd(), path.dirname(filename));
      //* process.cwd() returns whatever directory the user ran the command from
      //* path.dirname() returns whatever folder is specified within filename (the directory folder, not the actual file name)

      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file. `
      );
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === 'EADDRINUSE') {
          console.log('Port is in use. Try running on a different port.');
        }
      } else if (err instanceof Error) {
        console.log('Heres the problem:', err.message);
      }
      //* this forcibly exits the program with a status code of 1, which indicates we're
      //* exiting with an unsuccessful run of our program
      process.exit(1);
    }
  });
