const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db')
const { readdirSync } = require('fs');
const error = require('./middleware/error');

connectDB();

const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(cors());

app.get('/', (req, res) => {
	res.send('API is running...');
});

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

app.use(error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

