import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
//* localForage is a simple key/value store (npm package)
import localForage from 'localforage';

//* used to set an item in the database or get an item from it as well
const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      //* this only runs if the file matches the regex (regular expression) EXACTLY
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      //* this function will be called for all different files that we
      //* try to include in our bundle that are NOT named EXACTLY 'index.js'
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //* you don't have to return something in onLoad, but if there is no
        //* return statement, esbuild will simply skip over it and look for
        //* onLoad functions with a matching filter
        // return null;

        //* Check to see if we have already fetched this file
        //* and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        //* if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        //* args.path will be the key, the returned object will be the value
        // const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

        //* this finds all the new line characters and replaces them with an empty string
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
        const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style);
        
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        //* store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        //* args.path will be the key, the returned object will be the value
        // const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

        //* this finds all the new line characters and replaces them with an empty string
        // const escaped = data
        //   .replace(/\n/g, '')
        //   .replace(/"/g, '\\"')
        //   .replace(/'/g, "\\'");

        // const contents =fileType === 'css' ?
        // ` const style = document.createElement('style');
        // style.innerText = '${escaped}';
        // document.head.appendChild(style);` : data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        //* store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
