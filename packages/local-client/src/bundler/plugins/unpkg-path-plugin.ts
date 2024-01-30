import * as esbuild from 'esbuild-wasm';

//* this is an immediately invoked function bc it's wrapped in a
//* set of parentheses and then another set of parentheses right after it
// (async () => {
//* this stores info inside an IndexDB instance under the key of 'color'
//* with value 'red' (the two params)
// await fileCache.setItem('color', 'red');

//* this retrieves the key, (or the value associated with the key 'color')
//* (the param)
//   const color = await fileCache.getItem('color');

//   console.log(color);
// })();

export const unpkgPathPlugin = () => {
  return {
    //* the name property is mainly for identification
    //* during the debugging process
    name: 'unpkg-path-plugin',
    //* this will be called automatically by esbuild
    //* the 'build' argument represents the bundling process
    setup(build: esbuild.PluginBuild) {
      //* the way we interact with the build process is through
      //* event listeners, mainly onResolve and onLoad

      //* Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      //* Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });

      //* Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
