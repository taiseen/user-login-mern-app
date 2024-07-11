<img src="./client/public/readme.png" style='width:180px' align="right" />

> 3 - Jun - 2022

## User Login System | [Client][client] | [Server][server]

# SASS + React + ExpressJs + MongoDB

[client]: https://user-login-sys.netlify.app
[server]: https://user-login-api-five.vercel.app


## Project Setup:-

* For Client:-
    * cd /client
    * `yarn`

* For Server:-
    * cd /server
    * `yarn`


```
For Server need these 3 values...
MONGODB_URI = ********************
JWT_SECRET = ********************
JWT_EXPIRES_IN = ********************
```

## Package Upgrade:-
```
* npm install -g npm-check-updates
* ncu -u

old package update cmd --> yarn upgrade
```


## Project Structure:-
    
    ┌── client 
    │   ├── public              # root div#id for react application
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
| 4| yarn add `react-spinners`   | async data loading state |
| 5| yarn add `react-router-dom` | component navigation inside app |


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


<br/>


## Learning context by developing this app:
|No| Context learn by building this project...      | 
|--|------------------------------------------------|
| 1| Project Structure                              | 
| 2| MongoDB Connection                             |
| 3| Full CRUD operation                            | 
| 4| Image handling at UI                           |
| 5| JSON Web Token for track user                  |
| 6| Role Base Access Control - `RBAC`              |
| 7| Using of `toast effect` for notification       |
| 8| Image file uploaded at `cloudinary.com`        |
| 9| For async data loading, add loading spinner    |
| 10| Creating a server side logger for track all URL hit info |



[Loading... Spinner Example](https://www.davidhu.io/react-spinners)