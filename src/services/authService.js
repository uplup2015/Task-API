const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

const register = async (email, password, name) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hasedPassword
        }
    });

    const { password: _, ...userWithoutPasssword } = user;
    return userWithoutPasssword;
};

const login = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: {email},
    })

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    return { token };
};

module.exports = { register, login};
