const express = require('express');
require('dotenv').config();
const prisma = require('./prisma');
const authRoute = require('./routes/authRoute');
const taskRoute = require('./routes/taskRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/auth', authRoute);
app.use('/tasks', taskRoute);

app.get('/health', (req, res) => {
    res.json({status: 'ok'});
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})