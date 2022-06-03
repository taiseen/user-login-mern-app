import { pageNotFound, errorHandler } from './error/errorHandel.js';
import dataRouter from "./router/dataRouter.js";
import userRouter from "./router/userRouter.js";
import mongodb from "./connection/mongodb.js";
// import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const app = express()

// app.use(cookieParser('COOKIE_KEY')); // parse signed cookie
app.use(express.json());
app.use(cors());


// app.use('/', (req, res) => { res.json({ sms: "Hello..." }) });
app.use('/data', dataRouter);
app.use('/user', userRouter);



// 404 Page Not Found Error 
app.use(pageNotFound);

// Common Error Handler
app.use(errorHandler);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    mongodb();
    console.log('Server Start on port :', PORT, '🟩');
});






// default welcome message at root/index page...
const welcomeInfo = (req, res) => {
    res.send(` 
    <head>
        <title>Server is running... ✅</title> 
        <link rel="icon" href="/fav.ico">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

            body {
                text-align            : center;
                background-image      : url('server.gif');
                background-color      : #eee;
                background-repeat     : no-repeat;
                background-attachment : fixed;
                background-position   : center;
            }

            h1{
                width           : max-content;
                margin          : 50px auto 00px; 
                padding         : 20px 30px 24px;
                font-family     : 'Nunito', sans-serif;
                font-size       : 42px;
                color           : #111;
                border          : 1px solid black;
                border-radius   : 3px;
            }
            img{
                width  : 850px;
                height : 850px;
            }
        </style>
    </head>

    <body>
        <h1> Hotel Booking - Server is running... ✅ </h1>
    </body>
    `);
    // <img src='server.png'/>
}
app.get('/', welcomeInfo);