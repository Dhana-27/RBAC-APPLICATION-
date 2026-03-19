const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const seedDB = require('./seed');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', apiRoutes);

app.get('/', (req, res) => {
  res.send('RBAC API Running');
});

// Start Server Sequence
const startServer = async () => {
  await connectDB();
  await seedDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
