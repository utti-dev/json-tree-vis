# JSON Tree Visualizer

An interactive JSON Tree Visualizer built with React and React Flow. Try it live at [https://utti-dev.github.io/json-tree-vis/](https://utti-dev.github.io/json-tree-vis/)

## Features
- Paste JSON in the left panel and click "Generate Tree" to visualize.
- Tree visualization using React Flow:
  - Objects (purple), arrays (green), and primitives (yellow) with distinct colors
  - Automatic layout with parent-child connections
  - Interactive pan and zoom
- Search by JSON path:
  - Use paths like `$.user.address.city` or `items[0].name`
  - Matching node is highlighted and centered
  - Shows "Match found" or "No match found" status
- Click any node to copy its JSON path to clipboard
- Controls:
  - Generate Tree / Clear buttons
  - Fit View / Zoom controls
  - Pan by dragging the canvas

## Development

1. Clone and install dependencies:
```bash
git clone https://github.com/utti-dev/json-tree-vis.git
cd json-tree-vis
npm install
```

2. Start the dev server:
```bash
npm start
```
Visit http://localhost:3000 in your browser.

## Deployment

### GitHub Pages (current deployment)
The site is deployed at [https://utti-dev.github.io/json-tree-vis/](https://utti-dev.github.io/json-tree-vis/)

To deploy your own fork:
1. Update `homepage` in `package.json` to your GitHub Pages URL
2. Run the deploy command:
```bash
npm run deploy
```
This builds the app and pushes to the `gh-pages` branch.

### Alternative Deployment Options

#### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/utti-dev/json-tree-vis)
1. Click the Deploy to Netlify button or connect your repo manually
2. Remove `homepage` from `package.json`
3. Netlify will auto-deploy on every push to main

#### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/utti-dev/json-tree-vis)
1. Click Deploy or import your repo in Vercel dashboard
2. Remove `homepage` from `package.json`
3. Vercel will auto-deploy on every push to main

## Tech Stack
- React (Create React App)
- [React Flow](https://reactflow.dev/) for visualization
- GitHub Actions + GitHub Pages for CI/CD

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License
MIT
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
