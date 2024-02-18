const { createServer } = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const next = require('next');
const rateLimit = require('express-rate-limit');
const Axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 443;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per window (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
    legacyHeaders: false, // Disable the X-RateLimit-* headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
});

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '..', 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'localhost.pem')),
    secureProtocol: 'TLSv1_2_method',
};

const BASE_URL =
  'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&formatversion=2';

app.prepare().then(() => {
    const expressServer = express();

    expressServer.use(limiter);

    expressServer.use((req, res, next) => {
        if (req.secure) {
            next();
        } else {
            res.redirect(`https://${req.header.host} ${req.url}`);
        }
    });

    expressServer.get('/api/wiki', async (req, res) => {
        try {
            const { query, limit = 100, offset = 0 } = req.query;
            const response = await Axios.get(
                `${BASE_URL}&srsearch=${query}&srlimit=${limit}&sroffset=${offset}`,
            );

            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error in fetching data');
            res.status(500).json({ error: 'Server error' });
        }
    });

    expressServer.all('*', (req, res) => {
        return handle(req, res);
    });

    createServer(httpsOptions, expressServer).listen(process.env.PORT, (err) => {
        if (err) throw err;
        console.log('server started at https://localhost:443');
    });
});