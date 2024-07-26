const express = require('express');
const mongoose = require('mongoose');
const Reservation = require('./Models/reservation');
const dotenv = require('dotenv');
const path=require('path')

dotenv.config();

const app = express();
app.use(express.json());


const uri = process.env.MONGO_URI;
mongoose.connect(uri)

const database = mongoose.connection;
database.on('error', (error) => {
    console.error('Database connection error:', error);
});
database.once('connected', () => {
    console.log('Database Connected');
});


app.post('/create', async (req, res) => {
    try {
        const data = req.body;
        const reservation = new Reservation(data);
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/read/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ reservationId: req.params.id });
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        console.error('Error retrieving reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/update/:id', async (req, res) => {
    const id = req.params.id; 
  
    try {

      const updatedetails = await Reservation.updateOne({ reservationId: id }, req.body);
      const details = await Reservation.findOne({ reservationId: id });
      console.log("Updated details:", details);
  
      res.json(details);
    } catch (err) {

      console.log(err);

      
    }
  });

  app.get('/read/:date', async (req, res) => {
    try {
       
        const date = (req.params.date);

        
        const reservationList = await Reservation.find({ reservationDate :date});

        if (reservationList) {
            res.status(200).json(reservationList);
        } else {
            res.status(404).json({ message: 'No reservation found for this date' });
        }
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});




app.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Reservation.findOneAndDelete({ reservationId: req.params.id });
        if (result) {
            res.json({ message: 'Reservation deleted successfully' });
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
