# PetMyDog

### Project Idea/Goal

Pet My Dog will be a web app that allows dog owners to broadcast their location while
walking their dogs, during which other nearby users of the app can locate owners in real time
and follow them to pet their dogs. In addition to broadcasting their location, owners can also
share small amounts of information about themselves and their dogs to nearby users.

Some main features we will implement include user registration, dog profiles, retrieving nearby
pets in map and list view, requesting and accepting meetups with nearby dogs, and searching for
pets by name. Some stretch goals we could implement include calling and messaging between users,
invitation system for meetups, a like system for owners and petters for safety precautions, filtering
system, and redirection to other social media platforms (e.g., instagram, facebook).

### Layout of the repository

All the code will be contained in the main directory. The main directory is divided into front
and back end code, each in a sub directory. We will have our weekly reports in the Weekly Reports
directory, which we will update every week to report our progress and action items.

## Front-end:

### Setup Instructions

NPM

1. Navigate to main/front-end.

2. Run npm install.

3. To run PetMyDog on localhost, run npm start.

## Back-end:

### Setup Instructions (for use in IntelliJ):

#### Building and Running the project
1. Build the project in IntelliJ by navigating to the Maven tab in IntelliJ, opening `Lifecycle` in the `back-end` tab, and clicking the
   `Compile` button.
2. Run Elasticsearch locally. Follow the instructions provided here:
   https://www.elastic.co/downloads/elasticsearch
3. Run `Main.java` to launch the Spark server on localhost port 4567.

####Testing the project
1. Run Elasticsearch locally before testing by following the instructions provided here:
   https://www.elastic.co/downloads/elasticsearch
2. Navigate to the Maven tab in IntelliJ, open `Lifecycle` in the `back-end` tab, and click the `Test` button to run the provided
   tests.

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


