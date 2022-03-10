const mongoose =require('mongoose');
//1  개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인하게 함
const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
//2  몽구스와 몽고디비를 연결하는 부분
  mongoose.connect('mongodb+srv://cluster0.zoz5q.mongodb.net/myFirstDatabase', {
    dbName: 'nodejs',
    useNewUrlParser: true,
    //useCreateIndex: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};
//3  몽구스 커넥션에 이벤트 리스너를 달아 내용을 기록
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});
module.exports = connect;