import path from 'path';
import dotenv from 'dotenv';
import express from "express";
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js' 
import orderRoutes from './routes/orderRoutes.js' 
import { errorHandler,notFound} from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/uploadRoutes.js'
/./
// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

dotenv.config(); // to let me read variables from .env by  (process.env)
const port = process.env.PORT || 5000;

const app = express();
connectDB() // connect db


app.use(express.json()); //to read json from request 
app.use(express.urlencoded({ extended:true })); //accept data from 'form html' for fetching data  
app.use(cookieParser());// parse cookies attached to incoming requests

// => connect
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)



// Cookie parser middleware



app.get('/' , (req,res) =>{
    // res.send("API work")
})


const __dirname = path.resolve(); //set __dirname to current working directory "/project"
app.use('/uploads',express.static(path.join(__dirname,'/uploads'))); // to acces all file

// use notFound and errorHandler middleware to handle error
app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{ console.log(`server run on port ${port}`) }) // listen on port ${port}