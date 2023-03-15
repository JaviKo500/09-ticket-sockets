const socketController = (socket) => {
    console.log( 'connect', socket.id);
    socket.on('disconnect', () => {
    });
    socket.on( 'send-message', ( payload, callback ) => {
        const id = 123456;
        callback( {id, date: new Date().getTime()} );
        socket.broadcast.emit('send-message-client', payload);
    }); 
}

module.exports = {
    socketController
};