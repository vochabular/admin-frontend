# admin-frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/d805c211-ac0e-43bf-900d-1fc03acfece5/deploy-status)](https://app.netlify.com/sites/vochabular-admin/deploys)

This is the frontend of the admin interface, used internally [@Vochabular](https://www.vochabular.ch) for the creation, translation, reviewing and publishing of content.



## Introduction

This single-page-application (SPA) is written in Typescript and React and is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install

- Install a the package manager **[npm](https://nodejs.org/)**
- Based on the **.env.example** file, set the necessary environment variables in the **.env** file. The Auth0 variables you can get from the Auth0 Dashboard under "Applications".
- Clone the git repository with `git clone https://github.com/vochabular/admin-frontend`
- Install all required packages with `npm install`

### Additional steps to generate types with Apollo Codegen

- Install the apollo package globally:
  `npm install -g apollo`
- Then generate the types with:
  `apollo client:codegen`

### Note:

- We already start using the new [React Hooks API](https://reactjs.org/docs/hooks-intro.html), thus we need to use the alpha version of **react** and **react-dom**

- We use TypeScript. Resources:
  - Cheatsheet: https://github.com/sw-yx/react-typescript-cheatsheet
  - Nice repository in TS: https://github.com/jaredpalmer/formik
  - https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935

# Below is the original README.md from **create-react-app**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
