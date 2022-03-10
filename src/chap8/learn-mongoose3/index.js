const mongoose = require ('mongoose');

const connect = () => {
    if(process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
//    mongoose.connect('mongodb+srv://leedongyeop:dlehdduq1!@cluster0.zoz5q.mongodb.net/myFirstDatabase', {

    mongoose.connect('mongodb+srv://cluster0.zoz5q.mongodb.net/myFirstDatabase', {
        dvName: 'nodejs',
        useNewUrlParser: true,
        //useCreateIndex: true,
    }, (error) => {
        if(error) {
            console.log('몽고디비 연결 에러',error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });        
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊김. 연결 재시도해');
    connect();
});
module.exports = connect;