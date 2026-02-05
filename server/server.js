const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db')

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

