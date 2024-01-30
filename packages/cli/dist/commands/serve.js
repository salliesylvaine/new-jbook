"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
//* path is part of the node standard library. it contains functions that
//* help us calculate different paths on a file system
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
//* if isProduction is true, it means we're probs running on the user's machine
const isProduction = process.env.NODE_ENV === 'production';
//* before we take this code and deploy to npm, we're going to run this script.
//* this script will find (inside our raw JS file) "process.env.NODE_ENV". it will
//* replace it with "production". this will make isProduction always true
//* but when we're running on our local machine, "process.env.NODE_ENV" will, at least,
//* not be equal to "production" and isProduction will be false.
exports.serveCommand = new commander_1.Command()
    //* square brackets tell Commander that it's an optional value
    .command('serve [filename]')
    .description('Open a file for editing')
    //* params for .option are 1: different options, 2: describing options, 3: default value (port)
    //* angled brackets (<>) indicate a required value
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action((filename = 'notebook.js', options) => __awaiter(void 0, void 0, void 0, function* () {
    const isLocalApiError = (err) => {
        return typeof err.code === 'string';
    };
    try {
        //* calculates the directory variable
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        //* process.cwd() returns whatever directory the user ran the command from
        //* path.dirname() returns whatever folder is specified within filename (the directory folder, not the actual file name)
        yield (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction);
        console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file. `);
    }
    catch (err) {
        if (isLocalApiError(err)) {
            if (err.code === 'EADDRINUSE') {
                console.log('Port is in use. Try running on a different port.');
            }
        }
        else if (err instanceof Error) {
            console.log('Heres the problem:', err.message);
        }
        //* this forcibly exits the program with a status code of 1, which indicates we're
        //* exiting with an unsuccessful run of our program
        process.exit(1);
    }
}));
