const express = require('express')
const dotenv = require('dotenv')
 const mongoose =  require('mongoose')
 const bodyParser = require('body-parser')
const app = express()
const port = 6002

const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const restaurantRouter = require('./routers/restaurant')
const categoriesRouter =  require('./routers/categories')
const foodRouter =  require('./routers/food')
const cartRouter = require('./routers/cart')



dotenv.config()

const admin = require('firebase-admin');

const serviceAccounts = require('./serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccounts)
})
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected")).catch((err)=>console.log(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use('/',authRouter);
app.use('/api/users',userRouter);
app.use('/api/restaurant',restaurantRouter);
app.use('/api/category',categoriesRouter);
app.use('/api/foods',foodRouter);
app.use('/api/cart',cartRouter);
app.use("/hello", (req, res)=>{
    res.send("Hello")
});

app.listen(process.env.PORT||port, () => console.log(`foodly backend listening on port ${process.env.PORT||port}!`));