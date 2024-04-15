import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();


app.use(express.json());

dotenv.config();
app.use(bodyParser.json({ limit: "10000mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10000mb", extended: true }));


const corsOptions ={
  origin:'https://sweden-spectra.vercel.app', 
  credentials: 'include',           
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://sweden-spectra.vercel.app');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATH, HEAD, PATCH');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
//   });



app.use('/posts', postRoutes);
app.use('/user', userRoutes);


app.get('/', (req,res) => {
  res.json("Hello");
})


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`listening on port: ${PORT} and Database is Connected`)))
.catch((error) => console.log(error.message));
