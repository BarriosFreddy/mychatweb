# Welcome to My Chat Web

My chat web is an app to communicate with your friends, relatives and more. 

The app is exposed in the link that is below.

[APP DEMO](https://epic-northcutt-592ff3.netlify.app/)


## Stack

 - MongoDB - It's a document-based database
 - Express - It's  a framework that provides a set of features for web and mobile applications
 - React JS - It's a library for building user interfaces
 - Node JS - It's a JavaScript runtime built on Chrome's V8 JavaScript engine.

## Used Libraries
For backend
 - Mongoose - It's a mongodb object modeling for node.js
 - Body-parser - It's a middleware that parses incoming request bodies  
 - Cors - It's a middleware that enables CORS with various options
 - Socket-io - It's a framework that enables real-time event-based communication

For frontend
 - Axios - Promise based HTTP client for the browser and node.js
 - React Bootstrap - Bootstrap 4 components built with React.
 - React Icons - It's a set of popular icons
 - Firebase Storage Service - It's a service that lets upload and store user generated content, such as files, and images
 - History - It's a library that lets easily manage session history
 - React Router - It's a library that lets declare routing for React.
 - React Router Dom - It's a library that lets bind DOM for React Router.
 - Socket-io client - It´s a library that lets handle communications exposed by a socket-io server

 
## Tools

 - Nodemon - It's a tool that restarts automatically the node application when file changes
 - Yarn - It's an alternative dependencies manager 

## Local development

### Backend
To run the backend of the project, It is mandatory to execute the following commands in the root folder.

    $ cd backend

To download dependencies

    $ yarn install
To deploy project

    $ yarn start

### Frontend
To consumes the API locally is necessary change a constant of the project, in the Constants file which is located in frontend/src/constants/Constants.js, as It's shown below.

This

![Change constant](https://github.com/BarriosFreddy/mychatweb/blob/master/images/change_constant1.PNG)

To this

![Change constant](https://github.com/BarriosFreddy/mychatweb/blob/master/images/change_constant2.PNG)


To run the backend of the project, It is mandatory  to execute the following commands in the root folder.

    $ cd frontend

To download dependencies

    $ yarn install
To deploy project

    $ yarn start
