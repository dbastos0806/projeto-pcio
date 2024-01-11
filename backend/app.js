import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import { dbConfig } from './config/database.config.js';
import UserRoutes from './routes/UserRoutes.js';
import QuizRoutes from './routes/QuizRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
async function connectToDatabase() {
    try {
        await mongoose.connect(dbConfig.url, {
            //useNewUrlParser: true,
        });
        console.log("");
        console.log("           successfully connected to the database");
        console.log("");
    } catch (error) {
        console.log("");
        console.log("           could not connect to database.exiting now...", error);
        console.log("");
        process.exit();
    }
}
connectToDatabase();

// Creating express app
const app = express();

// Configuring the database
const port = 3000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//serve static files
const __dirname = fileURLToPath( new URL(".", import.meta.url));
app.use(express.static(path.join(__dirname, "../frontend")));

// define a simple route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/admin.html"));
});

app.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/user.html"));
});

// Apply cors middleware only to the '/user' route
app.use("/userdb", cors(), UserRoutes);

// Apply cors middleware only to the '/quiz' route
app.use("/quiz", cors(), QuizRoutes);

// listen for requests
app.listen(port, ()=> {
    console.log("");
    console.log("   Server in port 3000");
    console.log("");
    console.log("       I recharged");
});