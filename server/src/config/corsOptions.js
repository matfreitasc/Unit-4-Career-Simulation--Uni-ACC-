const whiteList = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173']
console.log('whiteList:', whiteList)
const corsOptions = {
    origin: whiteList,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}

module.exports = corsOptions
