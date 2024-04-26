import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import multer from 'multer';
import { createPost } from './controllers/posts.js'
import auth from './middleware/auth.js'

const router = express.Router();



const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use('/imageuploads', express.static('imageuploads'));


 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'imageuploads/'); 
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); 
  }
});

 const upload = multer({ storage: storage });


const corsOptions ={
  origin:'https://sweden-spectra.vercel.app', 
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://sweden-spectra.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send();
});




app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.post('/posts', auth, upload.single('file'), createPost);


app.get('/', (req,res) => {
  res.json("Hello");
})


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`listening on port: ${PORT} and Database is Connected`)))
.catch((error) => console.log(error.message));
