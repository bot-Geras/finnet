import cors from 'cors';

const corsOptions = {
    // origin: true, // Allow any origin for development
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true,
    // optionsSuccessStatus: 200,
     origin: process.env.FRONTEND_URL, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const corsMiddleware = cors(corsOptions);