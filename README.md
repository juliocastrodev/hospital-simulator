# Hospital Simulator 🏥

## Install and run 💾

Make sure to have `yarn` installed.

The following instructions will assume that you are using it (but it should also work with other package managers like `npm`)

You can start the application opening a command line in the root of the project an run

```bash
bash start.sh
```

The application should be accessible from [http://localhost:4200/](http://localhost:4200/)

If that doesn't work you can perfom the steps manually:

First we need to build the hospital library (which holds the core logic of the application)

```bash
# Navigate to the library directory
cd hospital-lib

# Install dependencies
yarn

# Build it
yarn build:prod
```

Then we need to start the backend server

To do so, open another terminal and run the following

```bash
# Navigate to the backend directory
cd hospital-be

# Install dependencies
yarn

# Start the server
yarn start
```

Finally, to start the frontend application, open another terminal and run the following

```bash
# Navigate to the frontend directory
cd hospital-fe

# Install dependencies
yarn

# Start the application
yarn start
```

Remember, the application should be accessible from [http://localhost:4200/](http://localhost:4200/)

## Usage 🔬

You can update the list of drugs and patients through the control panel

Each result comes from the backend server.

![Using the control panel](https://media.giphy.com/media/EqesNumoiz0O4wnxrk/giphy.gif)

Once you are ready, use the `simulate` button to create a simulation register.

![Simulate example](https://media.giphy.com/media/oODOMYQcdDdPXEyelN/giphy.gif)

Last 10 simulations are displayed in the history.

![History](https://media.giphy.com/media/AnCLpL7PCWVfHrY6R9/giphy.gif)

## Key points 🧐

The application is fully responsive without a single media query! 🎉

![Responsive example](https://media.giphy.com/media/0N8iqaHu18o6DQl3Vw/giphy.gif)

No 🐭 needed. You can fully use it with your keyboard.

We even have visual indications! 👀

![Visual indications](https://media.giphy.com/media/DW7wcE77bfxU6XCcZ2/giphy.gif)

## Running the tests 🧪

### Library

```bash
# Navigate to the library directory
cd hospital-lib

# Install dependencies
yarn

# Run the tests
yarn test
```

### Frontend

```bash
# Navigate to the frontend directory
cd hospital-fe

# Install dependencies
yarn

# Run the tests
yarn test
```

## To improve 📈

- Component testing could be more intensive, especially on larger components
- The style files could have a more semantic structure and be a little more reusable among the different components
- Dynamic dependency injection could be implemented to use fake services on demand and thus not depend on the backend server or the library itself to start the application.

## Author 🦸

Developed by [Julio César Castro López](https://linkedin.com/in/julio-cesar-castro-lopez-b759491b0)
