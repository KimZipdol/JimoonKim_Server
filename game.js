
module.exports = function(server) {

    var io = require('socket.io')(server, {
        transports: ['websocket'],
    });

    io.on('connection', function(socket) {
        console.log('Connected: ' + socket.id);

        socket.on('disconnect', function(reson) {
            console.log('Disconnected: ' + socket.id);
        });

        socket.on('hi', function() {
            //console.log('Hi~~');//클라에 로그출력
            //io.emit('hello');//socket.emit은소켓(여기서는 클라)에 전달. 하지만 메시지를 보낸 소켓에게만 보낸다.
            //io.emit은 메시지를 받으면 연결된 모든 소켓들에게 메시지 전달.
            socket.broadcast.emit('hello');//broadcast는 본인외의 모든 소켓에게 전달.
        });

        socket.on('message', function(msg) {
            console.dir(msg);//콘솔객체의 구조를 보여줌
            socket.broadcast.emit('chat', msg);
            //socket.broadcast.emit('chat', );
        });
    });
};
