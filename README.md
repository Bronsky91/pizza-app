# STRONGMIND Pizza App

## Build and Run Locally

You will need to run both Backend and Front projects at the same time so open two terminals.

- Backend
  &nbsp;&nbsp;&nbsp;&nbsp; 1. Make sure you have Ruby and Rails installed on your computer. You can check by running `ruby -v` and `rails -v` in your terminal. If you don't have Ruby and Rails installed, you can follow the installation instructions [HERE](https://gorails.com/setup) for your operating system.
  &nbsp;&nbsp;&nbsp;&nbsp; 2. `cd backend` to change into the back end project directory
  &nbsp;&nbsp;&nbsp;&nbsp; 2. `bundle install` to install all the required gems
  &nbsp;&nbsp;&nbsp;&nbsp; 2. `yarn install` to install the required packages in the package.json
  &nbsp;&nbsp;&nbsp;&nbsp; 2. `rails db:create` to create the databases specified in the config file
  &nbsp;&nbsp;&nbsp;&nbsp; 2. `rails db:migrate` to run all the pending database migrations and update the schema file
  &nbsp;&nbsp;&nbsp;&nbsp; 2. If you'd like to start the project with some pre-loaded data run `rails db:seed`
  &nbsp;&nbsp;&nbsp;&nbsp; 2. `rails server` to start the app
- Frontend
  &nbsp;&nbsp;&nbsp;&nbsp; 1. `cd frontend` to change into the front end project directory
  &nbsp;&nbsp;&nbsp;&nbsp; 2. `npm install` to install dependencies and setup the React app
  &nbsp;&nbsp;&nbsp;&nbsp; 3. `npm start` to start the React app
  &nbsp;&nbsp;&nbsp;&nbsp; 4. Browse to [http://localhost:3000/](http://localhost:3000/) if it does not automatically open, or whichever port it shows to use. If you ran the backend server first it will most likely ask you to run [http://localhost:3001/](http://localhost:3001/)

## Running Tests Locally

To run the backend tests locally you'll do the following:

1. `cd backend` if you're not already in the backend project folder
2. `rspec` will run the RSpec tests automatically
3. Check for failures
