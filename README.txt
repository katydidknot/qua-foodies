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

   To install node, if on a macOS please follow the directions here:
   https://nodejs.org/en/download/ - you can also use homebrew (my preference) to install node https://brew.sh/ by running the following
   command:
   `brew install node@(version goes here)`

2. npm (preferably 8.3.1) && or yarn
   To install npm follow directions here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
   To install yarn follow directions here: https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
3. python
4. flask

After installing please run the following command if using yarn:
`yarn install`

If using npm run:
`npm i`


## Execution -

After installing all packages, run the following commands to start the front-end:
`npm run start` or if using yarn: `yarn run start`

The application should start on the following url: http://localhost:3000/

## DEMO VIDEO -

Include the URL of a 1-minute *unlisted* YouTube video in this txt file. The video would show how to install and execute
your system/tool/approach (e.g, from typing the first command to compile, to system launching, and running some
examples). Feel free to speed up the video if needed (e.g., remove less relevant video segments). This video is
optional (i.e., submitting a video does not increase scores; not submitting one does not decrease scores). However, we
recommend teams to try and create such a video, because making the video helps teams better think through what they may
want to write in the README.txt, and generally how they want to "sell" their work.
