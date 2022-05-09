const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const userRoute = require("./routes/users")
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

const app = express();
const port = process.env.port || 3000;

// dotenv will automatically add the .env file content to the process.env object
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// adding middlewares

// app.use() method is used for adding middleware in the app
// https://masteringjs.io/tutorials/express/express-json#:~:text=Using%20express.json(),the%20parsed%20data%20in%20req.
// express.json() parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json())
// Helmet.js is a Node.js module that helps in securing HTTP headers
// https://www.youtube.com/watch?v=ldGl6L4Vktk&list=PLj-4DlPRT48lXaz5YLvbLC38m25W9Kmqy&index=4
app.use(helmet())
app.use(morgan("common"))

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts',postRoute);

app.listen(port, () => {
    console.log(`Backend is running.`);
})