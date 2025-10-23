import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import errorHandling from "./middleware/errorHandling.js";
import usersRouter from "./routers/usersRouter.js";
import tasksRouter from "./routers/tasksRouter.js";


dotenv.config();
const server = express();


server.use(logger);
server.use(express.json());
server.use(cors());
server.use("/users", usersRouter);
server.use("/tasks", tasksRouter);



const API_URL = process.env.API_URL;

server.get('/', (req, res) => {
    res.send("Express'ten Merhaba!!");
});


server.use(errorHandling);
server.listen(process.env.PORT, () => {
    console.log(`${API_URL} adresinde server calisiyor...`);
});
