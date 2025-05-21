// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Replace this with your MongoDB connection string
const MONGO_URI = 'mongodb+srv://priyanshu_rangari:20112002%40Pr@cluster0.enbgf.mongodb.net/FosDataDB?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  country: String,
  state: String,
});

const Contact = mongoose.model('Contact', contactSchema); // Creates a 'contacts' collection automatically

// POST endpoint to handle form submission
app.post('/submit', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
