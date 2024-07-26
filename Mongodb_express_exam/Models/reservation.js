const { Schema, model } = require('mongoose');

const reservationSchema = new Schema({
    reservationId: { type: Number, required: true }, 
    customerName: { type: String, required: true },
    tableNumber: { type: Number, required: true },
    reservationDate: { type: Date, required: true }, 
    time: { type: String, required: true }
});

const Reservation = model('Reservation', reservationSchema);
module.exports = Reservation;
