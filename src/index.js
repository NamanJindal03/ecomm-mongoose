import express from "express"
import cookieParser from "cookie-parser";
import baseRoutes from "./routes/index.js";
import customLogger from "./middlewares/custom_logger.js"
import { connectionToMongo } from "./db.js";

const app = express();
const PORT = 3000 //itroduce env later on


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true }));
app.use(customLogger);

app.use('/', baseRoutes)

//global error handler -> use it 
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.statusCode).json({
        status: error.status || false, 
        message: error.message || 'something is terribly wrong',
        error: error.error
    })
})

app.listen(PORT, async ()=>{
    await connectionToMongo()
        .then(()=> console.log('mongoose connected succesfully'))
        .catch(err => {
            console.log(err);
            process.exit(1);
        })
    console.log('server listenting at port', PORT);
})