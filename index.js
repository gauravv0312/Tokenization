require('dotenv').config();
const app = require('./app');
const connectWithDb = require('./config/db');
connectWithDb();
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
})