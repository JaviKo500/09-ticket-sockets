const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams( window.location.search );
if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error( 'the desktop is required' );
}

const desktop = searchParams.get('escritorio');
lblDesktop.innerText = desktop;

divAlert.style.display = 'none';
const socket = io();
socket.on('connect', () => {

    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on( 'pending-tickets', ( pendingTickets ) => {
    if ( pendingTickets === 0 ) {
        lblPendientes.style.display = 'none'
        divAlert.style.display = '';
    } else {
        lblPendientes.style.display = ''
        divAlert.style.display = 'none';
    }
    lblPendientes.textContent = `${pendingTickets}`;
});

btnAttend.addEventListener('click', () => {
    const payload = { desktop };
    socket.emit('attend-ticket', payload,  ( {ok, ticket, msg} ) => {
        if ( !ok ) {
            lblTicket.innerText = `None`;
            return divAlert.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.number}`
    })
});