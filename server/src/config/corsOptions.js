const whiteList = ['http://localhost:3000', 'http://localhost:5173']
const corsOptions = {
    origin: whiteList,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    // withCredentials: true,
    exposedHeaders: ['Set-Cookie'],
}

module.exports = corsOptions
