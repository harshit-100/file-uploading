const { Sequelize } = require(Sequelize) ;

const createDB = new Sequelize('test-db','user','pass',{
    dialect: 'sqlite',
    host: './config/db.sqlite',
});

const connectDB = () => {
    connectDB.sync().then(()=>{
        console.log('connected to db');
    })
    .catch((e) => {
        console.log('db connection faile',e);
    })
}

module.exports = { connectDB , createDB } ;