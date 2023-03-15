// reference html

const lblOnline  = document.querySelector('#lblOnline') ;
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend    = document.querySelector('#btnSend'    );
// 

const socket = io();
socket.on( 'connect', () => {
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
});
socket.on( 'disconnect', () => {
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
});

socket.on( 'send-message-client', (payload) => {
    console.log(payload);
});

btnSend.addEventListener( 'click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: 'asas1123',
        date: new Date().getTime()
    };
    socket.emit('send-message', payload, ( id ) => {
        console.log('server: ', id);
    });
});