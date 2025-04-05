const  express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path=require('path')
const cloudinary = require('cloudinary').v2;
const session = require('express-session');
const { default: mongoose } = require('mongoose');
const carRoute = require('./routes/carRoute');
require('dotenv').config();
const onwerRoute=require('./routes/onwerRoute');
const adminRoute=require('./routes/adminRoute');
const userRoute=require('./routes/userRoute');
const bookingRoute=require('./routes/bookingRoute');

const app = express();
const port = 3000;

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:5173'],
    credentials: true
}));



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/admin',onwerRoute);
app.use('/api/admin',carRoute);
app.use('/api/user',adminRoute);
app.use('/api/user',userRoute);
app.use('/api/booking',bookingRoute);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected!");
}).catch((err) => {
    console.error("MongoDB Connection Error:", err);
});




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`server is running on port ${port}!`))

