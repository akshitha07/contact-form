require('dotenv').config(); // Load environment variables FIRST

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

// Debug log
console.log('Mongo URI:', process.env.MONGO_URL);

app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
