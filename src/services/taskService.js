const prisma = require('../prisma');
const AppError = require('../utils/AppError');

const createTask = async (userId, title, description) =>{
    const task = await prisma.task.create({
        data: {
            userId,
            title,
            description
        }
    });

    return task;
};

const getTasks = async (userId, status) => {
    const where = { userId };

    if (status) {
        where.status = status;
    };
    const tasks = await prisma.task.findMany({
        where,
        orderBy: { createdAt: 'desc' }
    });

    return tasks;
}

const getTaskById = async (userId, taskId) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId}
    });

    if (!task) {
        throw new AppError('Task not found', 404);
    }

    if (task.userId !== userId) {
        throw new AppError('Unauthorized to access this task', 403);
    }

    return task;
};

const updateTask = async (userId, taskId, data) => {
   await getTaskById(userId, taskId);

   const updatedTask = await prisma.task.update({
    where: { id: taskId},
    data
   })

   return updatedTask;
}

const deleteTask = async (userId, taskId) => {
    await getTaskById(userId, taskId);

    await prisma.task.delete({
        where: { id: taskId}
    });
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };