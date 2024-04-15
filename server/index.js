import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
dotenv.config();
const app = express();


app.use(express.json());


app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// const corsOptions = {
//   origin: ['https://sweden-spectra.vercel.app'],
//   methods: "GET,HEAD,PUT,OPTIONS,POST,DELETE",
//   allowedHeaders: [
//     "Access-Control-Allow-Headers",
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "Authorization",
//     "token",
//     "Access-Control-Request-Method",
//     "Access-Control-Request-Headers",
//     "Access-Control-Allow-Credentials",
//   ],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions));

// app.use(cors({
//   origin: 'https://sweden-spectra.vercel.app',
//   methods:['GET','POST','DELETE','OPTIONS','PUT','HEAD', 'PATCH'],
//   credentials: true
// }));

app.use(cors());
app.use((req, res, next) => {
    res.header.append('Access-Control-Allow-Origin', 'https://sweden-spectra.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATH, HEAD, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });



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
