require('dotenv').config() 
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);


import bodyParser from 'body-parser';
import express from 'express';
import { router as todoRouter } from './modules/todo/todo.controller.js';
import mongoose from 'mongoose';

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(todoRouter);

app.listen(3000, async () => {
    console.log("http://localhost:3000");
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI);
})


