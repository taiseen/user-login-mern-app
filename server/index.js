import { pageNotFound, errorHandler } from './error/errorHandel.js';
import userInfoRouter from "./router/userInfoRouter.js";
import userRouter from "./router/userRouter.js";
import mongodb from "./connection/mongodb.js";
// import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './middleware/log.js';
dotenv.config();


const app = express()


// app.use(cookieParser('COOKIE_KEY')); // parse signed cookie
app.use('/fav.ico', express.static('public/fav.ico'));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(logger);



// app.use('/', (req, res) => { res.json({ sms: "Hello..." }) });
app.use('/userInfo', userInfoRouter);
app.use('/user', userRouter);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    mongodb();
    console.log('Server Start on port :', PORT, '🟩');
});






// Default welcome message at root/index page...
const welcomeMessage = (req, res) => {
    res.send(` 
    <head>
        <title>Server On! ✅</title> 
        <link rel="icon" href="/fav.ico">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

            body {
                text-align       : center;
                background-color : #eee;
            }

            h1{
                width         : max-content;
                margin        : 40px auto 00px; 
                padding       : 20px 30px 24px;
                font-family   : 'Nunito', sans-serif;
                font-size     : 36px;
                color         : #111;
                border        : 1px solid black;
                border-radius : 3px;
            }

            img{
                width  : 650px;
                height : 650px;
            }
        </style>
    </head>

    <body>
        <h1> User Login - Server is running... ✅ </h1>
        <img src='server.png'/>
    </body>
    `);
}
app.get('/', welcomeMessage);

// 404 Page Not Found Error 
app.use(pageNotFound);

// Common Error Handler
app.use(errorHandler);