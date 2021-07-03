var mongoose = require('mongoose');

module.exports = () => 
{
    mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Mongodb conected');
    })
    .catch(err => console.log(err.message));
    
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected');
    });

    process.on('SIGINT', () => {
        connection.close(() => {
            console.log('Mongoose connection closed on Application Timeout');
            process.exit(0);
        })
    });

}