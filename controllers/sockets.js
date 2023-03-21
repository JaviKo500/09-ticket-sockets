const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();
const socketController = (socket) => {

    // client connect
    socket.emit( 'last-ticket', ticketControl.last );
    socket.emit( 'current-status', ticketControl.last4 );
    socket.emit( 'pending-tickets', ticketControl.tickets.length );

    socket.on( 'next-ticket', ( payload, callback ) => {
        // ticketControl
        const next = ticketControl.next();
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length );
        callback( next );

        // todo notify new ticket

    }); 

    socket.on( 'attend-ticket', ( { desktop }, callback ) => {
        if ( !desktop ) {
            return callback({ 
                ok: false,
                msg: 'The desktop is required'
            })
        }

        const ticket = ticketControl.attendTicket( desktop );

        socket.broadcast.emit( 'current-status', ticketControl.last4 );
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length );

        socket.emit( 'pending-tickets', ticketControl.tickets.length );
        if ( !ticket ) {
            return callback({
                ok: false,
                msg: 'Noy tickets'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });
}

module.exports = {
    socketController
};