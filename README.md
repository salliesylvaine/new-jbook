# Welcome to JSNotebook-377!

## Installation Instructions

To install and use in your desired directory, you can run:

### `npx jsnotebook-377`

Installs the module into your project.\
**NOTE: `npm install jsnotebook-377` will not work, you must use npx.**

Once the install is complete, you will see available commands in the terminal for customizing and running the app.

### `jsnotebook-377 serve`

Runs the app with default settings.\
Open [http://localhost:4005](http://localhost:4005) to view it in the browser.
This will also create a js file project directory called `notebook.js` where any code and/or text you write in the app will be saved.

### `jsnotebook-377 serve <filename> -p <number>`

### `jsnotebook-377 serve <filename> --port <number>`

This will run the app with a custom filename and/or custom port number of your choosing.\
Both the filename and port numbers are optional, so if you leave either blank, the app will run with the default filename of `notebook.js` and the default port number of `4005`.

## How to use JSNotebook-377

JSNotebook-377 is an interactive development environment for writing and documenting JavaScript code in your local browser.
It comes with React and ReactDOM built-in, and is compatible with JavaScript and JSX.

To get started, click either the `Text` button or the `Code` button. This will open the respective editor. You can open as many Editors as you like, and can reorder them with the `up` and `down` arrow buttons on the top right of the Editor windows. Any Editor window can be deleted by clicking the `x` button also located on the top right of the editor windows.

**Note: All Text and Code you write in any Editor window will be saved to the `notebook.js` (or your customized filename) file that is automatically created within your project. This is also used to save your work. If the browser window closes and JSNotebook-377 is still running, simply reopen the window, and your progress should still be there.**

### Text Editor

This is used for writing out documentation.\
 Type in the left window and your formatted text will appear in the preview window on the right. Full markdown syntax is available to use via the options bar at the top of the Text Editor window.

### Code Editor

This is used for writing code in JavaScript and fully functional React components with JSX.\
When you open a Code Editor, you will see two windows. The left window is where you can write code, and the right window is the preview window. The code is automatically compiled as you write.
**Note: You might see errors in the preview window while you're coding. Since it's compiling in real time, it is advisable to finish writing out your code before taking heed of any errors you may see.**

#### `Format` button

There is a `Format` button in the top right of the coding window inside the Code Editor. When clicked, this will format the code you've written, deleting any unnecessary spacing, adding appropriate semi-colons, etc. This option is available for aesthetic purposes and easy code-cleanup. It is not necessary for compiling your code.

#### `show()` function

This is used to specify exactly what values you want to display in the preview window in the Code Editor.\
The Code Editor comes with a built-in `show()` function. To be able to see compiled code in the preview window, you _MUST_ call the `show()` function, passing in whatever code you wish to see as an argument.

[EX:]

```
show(123); ---> 123
```

```
const message = 'Hello world';
show(message) ---> Hello world
```

```
show([1,2,3]); ---> 1,2,3
```

To show a React component, you _MUST_ pass it into the `show()` function using JSX syntax.

[EX:]

```
const App = () => {
return (<p>Hello World</p>)
};

show(<App/>); ---> Hello World
```

#### `imports`

React and ReactDOM are built into the Code Editor and are immediately available to use without needing to import them.
**Note: While importing React / ReactDOM isn't necessary to use the Code Editor, if you want to include their respective import statements in your code, this will NOT affect the Code Editor, so feel free to do what works best for you.**

You can import just about any module directly from [npm] that you want in your code. There is no need to install them locally. Simply write the import statement for the desired npm package in the Code Editor window, and it will be available for use immediately. This includes css files / packages from [npm] as well.

[EX:]
import axios from 'axios';

Lastly, the Code Editors are interconnected. If you write a variable or function in one code editor, it will be accessible in every other code editor you have open, regardless of the order of the code editors on the page. This is to prevent having to rewrite the same code in different code editor windows. Please keep this in mind when deciding on naming conventions for your code.

#### `console.log()`

Console logs are visible in the browser console. They will NOT appear in the preview window.\
To view your console logs, right click in the browser window and navigate to `inspect`. This will open the browser console and allow you to view your console logs in real time.
**Note: The output of the console logs will not be saved in your `notebook.js` file on your local machine. The call of the console logs [console.log()] will be saved in `notebook.js` with the rest of your code.**
