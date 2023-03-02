import https from 'https';

export default function handler(req, res) {

    // prints the request headers in JSON format

    res.status(200);
    res.json(JSON.stringify(req.headers), 'utf8');
}