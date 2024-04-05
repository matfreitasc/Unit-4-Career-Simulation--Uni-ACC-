const whiteList = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'] || process.env.WHITE_LIST
const corsOptions = {
    origin: whiteList,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    withCredentials: true,
}

module.exports = corsOptions
