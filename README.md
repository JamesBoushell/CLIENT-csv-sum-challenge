# CSV Sum Project - CLIENT | By: James Boushell

![App Preview](/public/preview.png?raw=true)

This is my submission to SRE for the coding challenge presented after my interview. This app allows a user to upload a .csv file. The .csv file is then passed to a REST API where the sums of each row are calculated and sent back to the client. Once the client recieves the counts, they are then able to select which columns they would like to total up from a graphic spreadsheet interface.

I decided offer a second, more scalable, submission because in a project like this I would keep in mind the cases where larger files would need to be interpreted outside of the client, as well as cases where different analyses that might be desired.

## Instructions

To get this app to work you must first make sure that you are running the Server portion which hosts the REST api that this client will be calling on http://localhost:4000.

Once the server is running, navigate to this project directory and run 

### `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

