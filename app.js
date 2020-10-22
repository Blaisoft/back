const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const bodyParser=require('body-parser')
const expressValidator=require("express-validator")

require('dotenv').config()
//app
const app=express()
//import routes
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const braintreeRoutes=require('./routes/braintree')
const orderRoutes=require('./routes/order')





//db
mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology: true ,
    useNewUrlParser: true,
    useCreateIndex:true

  }).then(()=>console.log('DB connected'))
//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//routes middleware
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',braintreeRoutes)
app.use('/api',orderRoutes)






//launch app
const port=process.env.PORT|| 8000
app.listen(port,()=> console.log(`Serve is running at ${port}`))



