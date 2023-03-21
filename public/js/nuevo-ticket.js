
const buttonAdd = document.querySelector('button');
const lblNewTicket = document.querySelector('#lblNuevoTicket');

const socket = io();
socket.on('connect', () => {

    buttonAdd.disabled = false;
});

socket.on('disconnect', () => {
    buttonAdd.disabled = true;
});

socket.on( 'last-ticket', ( ticket ) => {
    lblNewTicket.textContent = `Ticket ${ticket}`;
});

buttonAdd.addEventListener('click', () => {
    socket.emit('next-ticket', null,  ( ticket ) => {
       lblNewTicket.innerHTML = ticket;
    })
});