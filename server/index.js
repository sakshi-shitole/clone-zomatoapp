import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

//Private route authorization config
import privateRouteConfig from './config/route.config';


//Database connection
import ConnectDB from "./database/connection";

import Auth from './api/auth';
import Food from './api/food';
import Restaurant from './api/restaurant';
import User from './api/user';
import Menu from './api/menu';

dotenv.config();

privateRouteConfig(passport);

const zomato = express();

// Adding aditional passport configuration 
zomato.use(express.json());
zomato.use(session({ secret: process.env.JWTSECRET }));
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get('/', (req, res) => {
    res.json({
        message: "Server is runnimg",
    });
});

// /auth/signup
zomato.use("/auth", Auth);
zomato.use("/food", Food);
zomato.use("/restaurant", Restaurant);
zomato.use("/user", User);
zomato.use("/menu", Menu);

const PORT = 4000;

zomato.listen(PORT, () => {
    ConnectDB()
        .then(() => {
            console.log(" Server is running !!!");
        })
        .catch((error) => {
            console.log("Server is running, but database connection failed...");
            console.log(error);
        });
});


