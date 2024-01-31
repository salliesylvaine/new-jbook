"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const cells_1 = require("./routes/cells");
const serve = (port, filename, dir, useProxy) => {
    const app = (0, express_1.default)();
    // wiring up the express router
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    /* TWO DIFFERENT WAYS OF SERVING UP OUR REACT ASSETS */
    if (useProxy) {
        //! This one is intended for whenever we are running our application in a development mode
        //! and we have an actual create-react-app server running
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://127.0.0.1:3000',
            //* ws = web sockets
            ws: true,
            logLevel: 'silent',
        }));
    }
    else {
        //! This one is intended for when a user has installed our CLI on their local machine
        //* this will find the local-client build directory in node_modules folder
        const packagePath = require.resolve('@jsnotebook-377/local-client/build/index.html');
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    //* we're taking the entire process of starting up an express server and
    //* wrapping it inside of our own custom Promise. this brings express into
    //* the async/await syntax
    return new Promise((resolve, reject) => {
        //* if we successfully start up our server, the resolve function will be
        //* called automatically, resolving our Promise.
        //* if something goes wrong, the reject function runs and will cause the try/catch block
        //* in the serveCommand in the cli to capture the error and end up in the catch statement
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
