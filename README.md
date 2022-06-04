<img src="./client/public/readme.png" style='width:180px' align="right" />

> 3 - Jun - 2022

## User Login System 

# SASS + React + NodeJs + MongoDB


## Project Structure
    
    ┌── client 
    │   ├── public              # root div#id for react app
    │   └── src
    |       ├── components      # all needful components 
    |       ├── constants       # static needful data
    |       ├── hook            # server communication (api calling)
    |       ├── style           # default common styling
    |       ├── App.js          # Router for navigating, inside app
    |       └── index.js        # client - app running start point
    | 
    ├── server  
    │   ├── connection          # mongodb connection
    │   ├── controller          # all database related business logic query
    │   ├── error               # common error handel
    │   ├── middleware          # controller action gard 
    │   ├── model               # database schema 
    │   ├── public              # all static assets are present here
    │   ├── router              # url direction of an application
    │   ├── index.js            # server - running starting point
    │   └── log.txt             # log of all info about api/url hit point
    |
    └── README.md

<br />


# Client | side dependencies...

|No| Package Installs            | Use for...               |
|--|-----------------------------|--------------------------|
| 1| yarn add `sass`             | ui styling               |
| 2| yarn add `axios`            | api CRUD request         |
| 3| yarn add `react-toastify`   | add notifications        |
| 4| yarn add `react-router-dom` | for component navigation |


<br/>


# Server | side dependencies...

|No| Package Installs       | Use for...                                    |
|--|------------------------|-----------------------------------------------|
|1 | yarn add `cors`        | enabling Cors origin request                  |
|2 | yarn add `dotenv`      | hide the confidential data from public        |
|3 | yarn add `express`     | creating routing for application              |
|4 | yarn add `nodemon`     | changing happen, server restart automatically |
|5 | yarn add `mongoose`    | creating DB schema/modal for POST-ing data    |
|6 | yarn add `bcryptjs`    | hashing function for password security        |
|7 | yarn add `jsonwebtoken`| share security information between two parties|