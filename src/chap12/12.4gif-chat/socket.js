const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' }); //소켓에 웹 소켓 이벤트를 연결
  app.set('io', io); //라우터에서 io 객체를 쓸 수 있게 저장해둠
  const room = io.of('/room');  //of 메소드는 다른 네임스페이스를 만들어 접속할 수 있다.
  const chat = io.of('/chat');

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {  //방에 들어가고 방에서 나가는 메소드
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId = referer
      .split('/')[referer.split('/').length - 1]
      .replace(/\?.+/, '');
    socket.join(roomId);

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId);
    });
  });
};