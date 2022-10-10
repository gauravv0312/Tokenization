const mongoose = require('mongoose');

const connectWithDb = ()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('DB GOT CONNECTED'))
    .catch((error)=>{
        console.log('DB CONNECTION ISSUSES');
        console.log(error);
    })
};
module.exports = connectWithDb