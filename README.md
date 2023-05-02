# STRONGMIND Pizza App

## Build and Run Locally

You will need to run both Backend and Front projects at the same time so open two terminals.

### Backend

1.  Make sure you have Ruby version 2.7.4 and Rails 7.0.4 installed on your computer. You can check by running `ruby -v` and `rails -v` in your terminal. If you don't have Ruby and Rails installed, you can follow the installation instructions [HERE](https://gorails.com/setup) for your operating system.
2.  `cd backend` to change into the back end project directory
3.  `bundle install` to install all the required gems
4.  `yarn install` to install the required packages in the package.json
5.  `rails db:create` to create the databases specified in the config file
6.  `rails db:migrate` to run all the pending database migrations and update the schema file
7.  If you'd like to start the project with some pre-loaded data run `rails db:seed`
8.  `rails server` to start the app

### Frontend

1. `cd frontend` to change into the front end project directory
2. `npm install` to install dependencies and setup the React app
3. `npm start` to start the React app
4. Browse to [http://localhost:3000/](http://localhost:3000/) if it does not automatically open, or whichever port it shows to use. If you ran the backend server first it will most likely ask you to run [http://localhost:3001/](http://localhost:3001/)

## Running Tests Locally

To run the backend tests locally you'll do the following:

1. `cd backend` if you're not already in the backend project folder
2. `rspec` will run the RSpec tests automatically
3. Check for failures
