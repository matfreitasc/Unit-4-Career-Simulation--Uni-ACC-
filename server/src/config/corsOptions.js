const whiteList = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://marvelous-lily-8fb773.netlify.app',
    'https://capstone.matfreitas.dev',
]
const corsOptions = {
    origin: whiteList,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    // withCredentials: true,
    exposedHeaders: ['Set-Cookie'],
}

module.exports = corsOptions
