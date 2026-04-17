const express = require('express');
require('dotenv').config();
const prisma = require('./prisma');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({status: 'ok'});
});

app.get('/test-db', async (req,res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({success: true, count: users.length, users});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})