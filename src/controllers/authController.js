const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const {email, password, name} = req.body;
    
        if(!email || !password) {
            return res.status(400).json({error: 'Email and password are required'});
        }

        const user = await authService.register(email, password, name);
        res.status(201).json({message: 'User registered successfully', user});
    } catch (error) {
        if (error.message === 'Email already in use') {
            return res.status(409).json({error: error.message});
        }
        res.status(500).json({error: 'Internal server error'}); 
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.stats(400).json({error: 'Email and password are required'});
        }

        const result = await authService.login(email, password);
        res.json({message: 'Login successful', token: result.token});
    } catch (error) {
        if (error.message === 'Invalid email or password') {
            return res.status(401).json({error: error.message});
        }
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports = { register, login};