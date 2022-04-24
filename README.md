## Description:

The QuaFoodies application is a web based application that displays restaurant related data analysis for prospective
restaurant entrepreneurs. Our web application is written in Typescript/React on the frontend and python/flask on the
backend. The application consists of a visualization of all restaurant closings and openings during the covid-19
pandemic. The application is also interactive in that it takes input form the user and predicts restaurant survivability
given multiple factors.

The user will be presented with multiple checkboxes that they can select that correspond to the type of restaurant
and/or features of their prospective restaurant. We take the input in the form of booleans and pass that to the API
which is written in python/flask. This api serializes the data into a model that we can then run analysis on. We return
either a successful or unsuccessful prospective rating for the user. The user can then make decisions or tweak their
inputs accordingly.

## Installation:

Installation Dependencies:

1. node (preferably 17.4.0)

   To install node, please follow the directions here:
   https://nodejs.org/en/download/ - you can also use homebrew (my preference) to install node https://brew.sh/ by running the following
   command:
   `brew install node@(version goes here)`

2. python (3.7 or above)
	Recommended command: `brew install python3`
3. flask
	Recommended command: `pip3 install flask`
4. flask_cors
	Recommended command: `pip3 install flask_cors`
5. pandas
	Recommended command: `pip3 install pandas`
6. numpy
	Recommended command: `pip3 install numpy`
7. xgboost
	Recommended command: `pip3 install xgboost`

Using npm run:
`npm i`


## Execution -

After installing all packages, run the following command to start the front-end from the CODE directory:
`npm run start`

If there is an issue with running the above command, navigate to the package.json file within the CODE directory and change the scripts' path "node_modules/.bin/react-scripts" to "react-scripts".

Open a new terminal and navigate to the api folder within the CODE directory. Run the following command to start the api server:
`python3 server.py` (or `python server.py` if using alias for latest version of python)

The application should start on the following url: http://localhost:3000/

## DEMO VIDEO -
https://youtu.be/4RelMZhJRqE
